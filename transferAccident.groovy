@GrabConfig( systemClassLoader=true )
@Grab(group='org.postgresql', module='postgresql', version='42.2.6')

import java.time.ZoneId

import groovy.sql.Sql
import groovy.json.JsonSlurper

println 'Start Pravstat Accident parser ...'
/** 
 * Connection to an appropriate
 * container, that contains a 
 * postgresql database for the 
 * module, that is being populated
 * with the values from a third 
 * party api.

 * The connection uses outer (exposed)
 * port (that is defined in a docker-compose.yml file) 
 * and the server's external ip (<SERVER_EXTERNAL_IP>)
 */
def db = [url:'jdbc:postgresql://<SERVER_EXTERNAL_IP>:5440/public-safety-db?stringtype=unspecified', user:'<DB_USER>', password:'<DB_PASSWORD>', driver:'org.postgresql.Driver']
def sql = Sql.newInstance(db.url, db.user, db.password, db.driver)

/** 
 * A third party resource's external api
 */
def base = 'http://infopublic.pravstat.kz:8399/arcgis/rest/services/rta/MapServer/0/query?'
 
def jsonSlurper = new JsonSlurper()

/** 
 * Custom query parameters that are
 * sent alongside with the http request
 */
def contentParams = [
    f:'json',
    where: "AREA_CODE='1975'",
    returnGeometry:'true',
    outFields: '*',
    outSR:'4326'
]

/** 
 * Custom query parameters that 
 * are defined above are collected
 * to the form of `param1=value1&param2=value2`
 * to satisfy the http query parameters' protocol
 */
def contentStringUrl = base + contentParams.collect { k,v -> "$k=$v" }.join('&')

/** 
 * Construct a URL object to make
 * an http request to a third party api
 */
def contentUrl = new URL(contentStringUrl)

/** 
 * Parse a response object obtained
 * from the request to an external 
 * api as a json object 
 */
def contentObject = jsonSlurper.parseText(contentUrl.getText())

/** 
 * Iterate through parsed json objects
 * to extract each one separately and
 * construct an appropriate sql insert query
 */
contentObject.features.each{object->
    def objectMap = object.attributes
    objectMap = objectMap.findAll{ it.value !=null || it.value != 'null' }
    
    /** 
     * Make the geometry points from the response
     * to form a POINT type from a postgis
     * extension
     */
    objectMap.put('geom',"POINT(${object.geometry.x} ${object.geometry.y})")
    
    /** 
      * Construct an sql insert query
      * to follow the types and ignore
      * the case when a unique id's
      * being inserted more than 
      * once.
      */
    sql.execute("""
      insert into accidents(id, "json-repr") values (
          ${objectMap.OBJECTID}::bigint, 
          json_build_object(
              'rta-type', ${objectMap.RTA_TYPE}::bigint, 
              'date', ${objectMap.RTA_DATE}::bigint, 
              'time', ${objectMap.FD1R05P1}::text, 
              'time-descr', ${objectMap.FD1R07P2}::text, 
              'location', ${objectMap.FD1R07P4}::text, 
              'weather-conditions', ${objectMap.FD1R071P1}::text, 
              'violation-type', ${objectMap.FD1R09P1}::text, 
              'culprit', ${objectMap.FD1R14P1}::text, 
              'driver-condition', ${objectMap.FD1R141P1}::text, 
              'region', ${objectMap.FD1R06P2}::text, 
              'city', ${objectMap.FD1R06P3}::text, 
              'vehicle-category', ${objectMap.VEHICLE_CATEGORY}::text, 
              'is-public-transport', ${objectMap.IS_PUBLIC_TRANSPORT}::bigint,
              'geometry', json_build_object(
                'x', ${object.geometry.x}::double precision, 
                'y', ${object.geometry.y}::double precision
              )
          )
      ) on conflict(id) do nothing
    """)
}

println 'Finished Pravstat Accident parser [OK]'
