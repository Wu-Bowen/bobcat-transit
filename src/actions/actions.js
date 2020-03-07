import fetch from 'cross-fetch';
import C from '../constants';

export const setName = name => 
  ({
    type: C.SET_NAME,
    payload: name
  })

export const setArrivalTime = arrivalTime =>
({
  time: C.SET_ARRIVAL_TIME,
  payload: arrivalTime
})

export const setUserAddress = address => 
  ({
    type: C.SET_USER_ADDRESS ,
    payload: address
  })

export const addCourse = (courseId, courseName, courseTimes=[], courseLocation=null) => ({
  type: C.ADD_COURSE,
  payload: { courseId, courseName, courseTimes, courseLocation }
})

export const removeCourse = (courseId) => ({
    type: C.ADD_COURSE,
    payload: courseId
})

export const addFavoritePlace = (placeName) => ({
  type: C.ADD_FAVORITE_PLACE,
  payload: placeName
})

export const removeFavoritePlace = (placeName) => ({
  type: C.REMOVE_FAVORITE_PLACE,
  payload: placeName
})


export const addError = (errorMessage) => ({
    type: C.ADD_ERROR,
    payload: errorMessage
})

export const clearError = () => ({
    type: C.CLEAR_ERROR,
})

export const cancelFetch = () => ({
    type: C.CANCEL_FETCHING
})

export const fetchShuttleDirections = (origin, destination) => (dispatch) => {
  dispatch({
    type: C.FETCH_PASSIO_DIRECTIONS
  })

  // const data = JSON.stringify
}

export const fetchShuttle = async (...shuttleIds) => (dispatch) => {
  dispatch({
    type: C.FETCH_SHUTTLE
  })

  const data = JSON.stringify({"s0":"1007","sA":1,"rA":0});
  fetch('https://passio3.com/www/mapGetData.php', {
    headers: {
      'Content-Type': 'application/json',
      'Content-Length': data.length
    },
    method: "POST",
    body: data,
  }).then(res => res.json())
    .then(data => {
      return {
        type: C.CHANGE_SHUTTLE_LISTING,
        payload: data
      }
    })
    .catch(err => {
      dispatch({
        type: C.ADD_ERROR,
        payload: err,
      })
      dispatch({
        type: C.CANCEL_FETCHING
      })
    })
 }

 export const fetchCourse = async (year, semester, queryText) => (dispatch) => {
  dispatch({
    type: C.FETCH_COURSE
  })
  fetch(`schedge.torchnyu.com/${year}/${semester}/search?query${queryText}&limit=4`)
    .then(res => res.json())
    .then(json => {
      return json.map((course) => {
        return {
          courseId: course.deptCourseId,
          courseName: course.name,
          courseTimes: course.sections[0].meetings,
          courseLocation: course.location
        }
      })
    })
    .then(courseList => {
      return {
        type: C.CHANGE_COURSE_SUGGESTIONS,
        payload: courseList
      }
    })
    .catch(err => {
      dispatch({
        type: C.ADD_ERROR,
        payload: err,
      })
      dispatch({
        type: C.CANCEL_FETCHING
      })
    })
  
 }
  // fetch course data and dispatch suggestions

/*

export const addAlert = (alertMessage) => ({
    type: C.ADD_ALERT,
    payload: alertMessage
})

export const clearAlert = (alertMessage) => ({
    type: C.CLEAR_ALERT,
    payload: alertMessage
})


export const fetchCitiBikeStations = () => (dispatch) => {
  dispatch({
    type: C.FETCH_CITIBIKE_STATION
  })
    
  const url = 'https://gbfs.citibikenyc.com/gbfs/en/station_information.json';

  fetch(url)
    .then(response => response.json())
    .then(json => {
      return {
        type: C.CHANGE_CITIBIKE_STATIONS,
        payload: json
      }
    }).catch(err => {
      dispatch(addError(err));

      dispatch({
        type: C.CANCEL_FETCHING
      })
    })
}
*/
 // fetch citi bike station and dispatch suggestions
//  rewrite in fetch


 // fetch all data
/*
export const fetchAllData = ()  => {
  dispatch({
    type: C.FETCH_ALL_DATA
  })
  try{ 
    let data = await Promise.all([fetchCitiBikeStations(), fetchShuttle(), fetchMTA()]);
    return data;
  } catch (error){
    dispatch(addError(error));
    throw(error);
  }
}
*/
