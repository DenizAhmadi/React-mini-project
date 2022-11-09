import axios from "axios";
export const VERIFY_LENGTH = 6;
export const API_BASE_URL = "http://37.156.144.109:8001/api/";
// export const API_BASE_URL = "http://127.0.0.1:8000/api/";
axios.defaults.baseURL = API_BASE_URL;
//Auth
export const API_LOGIN_URL = API_BASE_URL + "profile/login/";
export const API_SIGNUP_URL = API_BASE_URL + "profile/signup/";

//Geofence
export const API_GEOFENCE_URL = API_BASE_URL + "zone_points_detail/";

//Device Management
export const API_DEVICEMANAGEMENT_URL =
  API_BASE_URL + "deviceManagement/device/";
export const API_DEVICEMANAGEMENT_EDIT =
  API_BASE_URL + "deviceManagement/device/edit/";
export const API_GET_DEVICE = API_BASE_URL + "deviceManagement/device/";
export const API_GET_DEVICE_CATEGORY =
  API_BASE_URL + "deviceManagement/alldeviceCategory/";
export const API_GET_DEVICE_TYPE =
  API_BASE_URL + "deviceManagement/deviceType/";
export const API_ASSIGN_DEVICES_TO_CATEGORY =
  API_BASE_URL + "deviceManagement/deviceCategory/";
export const API_SEARCH_ASSIGNED_DEVICES =
  API_BASE_URL + "deviceManagement/device/search/nameField/";

//ZoneMapping
export const API_ASSIGN_DEVICES_TO_SHOW =
  API_BASE_URL + "devicestoshowdevicestoshow";

//Rules
export const API_GET_FEATURES = API_BASE_URL + "ruleManagement/rules/features/";
export const API_GET_OPERATIONS =
  API_BASE_URL + "ruleManagement/rules/operations/";
export const API_GET_NEW_RULE_CONDITION =
  API_BASE_URL + "ruleManagement/conditions/rule/";
export const API_GET_RULES_LIST = API_BASE_URL + "ruleManagement/Allrules/";
export const API_POST_NEW_RULE =
  API_BASE_URL + "ruleManagement/rules/form/new/";
export const API_DELETE_ARCHIVE_RULE = API_BASE_URL + "ruleManagement/rules/";
export const API_POST_ACTIVE_RULE =
  API_BASE_URL + "ruleManagement/unarchive_rule/";
export const API_GET_EVENTS_HISTORY =
  API_BASE_URL + "eventManagement/events/list/";
export const API_SEARCH_EVNETS_HISTORY =
  API_BASE_URL + "eventManagement/search/";
export const API_RULE_DETAILS = API_BASE_URL + "ruleManagement/rules/";
export const API_ARCHIVE_RULE_DETAILS =
  API_BASE_URL + "ruleManagement/archive_rules/";
export const API_ARCHIVE_RULE_EDIT =
  API_BASE_URL + "ruleManagement/archive_rule/";
//history
export const API_GET_WAY_POINT = API_BASE_URL + "time_range_track/";
export const API_GET_HISTORY_DETAILS = API_BASE_URL + "history/details/";

//Zones
export const API_All_ZONES_URL = API_BASE_URL + "zoneMonitoring/zonesinfo/";
export const API_All_ZONES = API_BASE_URL + "all_zones_detail/";
export const API_CATEGORIES = API_BASE_URL + "categoryManagement/";
export const API_GET_DEVICE_BY_CATEGORY_ID = API_BASE_URL + "categoryinfo/";
export const API_TRACKMONITORING =
  API_BASE_URL + "trackingManagement/trackings/";
export const API_TRACK_MANAGEMENT = API_BASE_URL + "trackingManagement/";
export const API_TRACKMONITORING_HISTORY =
  API_BASE_URL + "trackingManagement/history";
export const API_GET_ALL_TRACKINGS =
  API_BASE_URL + "trackingManagement/trackings/list/";
export const API_GET_ALL_TEMPLATES =
  API_BASE_URL + "trackingManagement/tracking_template/list/";
export const API_CHECKPOINTS_TRACKING =
  API_BASE_URL + "trackingManagement/checkpoints/tracking/";
export const API_TRACKING_TEMPLATE =
  API_BASE_URL + "trackingManagement/tracking_template/";
export const API_LASTLOCATIONS = API_BASE_URL + "tracking/lastLocs/list/";
export const API_LASTDEVICELOCATION = API_BASE_URL + "tracking/lastLoc/device/";

//Dashboard
export const API_HEATMAP_LOCATION =
  API_BASE_URL + "heatmap/location/lastmonth/list";
export const API_DASHBOARD_HISTOGRAM = API_BASE_URL + "dashboard/histogram/";
export const API_DASHBOARD_PERDEVICEHISTOGRAM =
  API_BASE_URL + "dashboard/perdevicehistogram/";
export const API_DASHBOARD_EVENTS_PERDEVICEHISTOGRAM =
  API_BASE_URL + "dashboard/events/perdevicehistogram/";
export const API_DASHBOARD_ZONE_HISTOGRAM =
  API_BASE_URL + "dashboard/zone_histogram/";
export const API_DASHBOARD_DIST_HISTOGRAM =
  API_BASE_URL + "dashboard/dist_histogram/";
export const API_DASHBOARD_LOWEST_ACTIVITY_CARD =
  API_BASE_URL + "dashboard/card/leastActive";
export const API_GET_DASHBOARD_EVENT_CARD =
  API_BASE_URL + "dashboard/card/monthly/max_event/";
export const API_GET_DASHBOARD_UPTIME_CARD =
  API_BASE_URL + "dashboard/card/monthly/max_time/";
export const API_GET_DASHBOARD_DIST_CARD =
  API_BASE_URL + "dashboard/card/monthly/max_dist/";
export const API_GET_DASHBOARD_DATA_PERIOD =
  API_BASE_URL + "dashboard/lastmonth/";
export const API_GET_DASHBOARD_V_PER_DAY =
  API_BASE_URL + "dashboard/chart/monthly/max_v_and_avg/";
export const API_GET_DASHBOARD_CLUSTERING_DATA =
  API_BASE_URL + "dashboard/clustering-t-d/";
export const API_GET_DASHBOARD_CORRELATION_DATA =
  API_BASE_URL + "dashboard/chart/monthly/correlation/";
export const API_GET_DASHBOARD_WHISKER_AND_BOX_FOR_VELOCITIES =
  API_BASE_URL + "dashboard/dashboard_mean_velocity/";
export const API_GET_DASHBOARD_CLUSTERING_TABLE =
  API_BASE_URL + "dashboard/cluster_table/";
export const API_GET_DASHBOARD_CLUSTERING_TABLE_2 =
  API_BASE_URL + "dashboard/cluster_table_2/";

//Users-Profile
export const API_PROFILE_GET_USERS = API_BASE_URL + "profile/get_users/";
export const API_PROFILE_GET_USER_INFO =
  API_BASE_URL + "profile/get_user_info/";
export const API_PROFILE_GET_CARD_1_2_INFO = API_BASE_URL + "profile/card/1/2/";
export const API_PROFILE_GET_CARD_4_INFO = API_BASE_URL + "profile/card/4/";
export const API_PROFILE_GET_CARD_7_INFO = API_BASE_URL + "profile/card/7/";
export const API_PROFILE_GET_USER_HEATMAP = API_BASE_URL + "heatmap/location/";
export const API_PROFILE_DIST_HISTOGRAM =
  API_BASE_URL + "profile/dist_histogram/";
export const API_PROFILE_AVG_V = API_BASE_URL + "profile/v_zscore/";
export const API_PROFILE_DIST_Z_SCORE =
  API_BASE_URL + "profile/distance_zscore/";
export const API_PROFILE_AVG_V_COMPARED_TO_ALL =
  API_BASE_URL + "profile/v_zscore/compared_to_all/";
export const API_PROFILE_EVENT_COMPARED_TO_ALL =
  API_BASE_URL + "profile/event_zscore/compared_to_all/";
export const API_PROFILE_GET_EVENTS_CHART =
  API_BASE_URL + "profile/chart/events/";
export const API_PROFILE_GET_ARIMA_PREDICTION =
  API_BASE_URL + "profile/arima_pridiction/";
export const API_PROFILE_GET_ARIMA_LAST_PREDICTION =
  API_BASE_URL + "profile/previously_predicted/";
export const API_PROFILE_WHISKER_AND_BOX =
  API_BASE_URL + "profile/whisker_and_box/";
export const API_PROFILE_WHISKER_AND_BOX_FOR_DISTANCE =
  API_BASE_URL + "profile/whisker_and_box_for_distance/";
export const API_PROFILE_WHISKER_AND_BOX_OUTLIERS_TIME =
  API_BASE_URL + "profile/whisker_box_time_of_outliers/";
export const API_GET_PROFILE_CORRELATION =
  API_BASE_URL + "profile/chart/correlation/";

//WebSocket
export const WEBSOCKET = API_BASE_URL + "ws/";

//users-management
export const API_GET_ALL_USERS =
  API_BASE_URL + "userManagement/getAllUnassignedUsernames/";
export const API_USERS_MANAGEMENT_GET_USERS =
  API_BASE_URL + "userManagement/getAllStaffs/";
export const API_USERS_MANAGEMENT_RESET_PASS =
  API_BASE_URL + "userManagement/resetpassword/";
export const API_USERS_MANAGEMENT_ADD_USER =
  API_BASE_URL + "userManagement/addNewStaff";
export const API_USERS_MANAGEMENT_EDIT_USER =
  API_BASE_URL + "userManagement/editUser/";
export const API_USERS_MANAGEMENT_SEARCH_USER =
  API_BASE_URL + "userManagement/searchUsers/";
export const API_USERS_MANAGEMENT_GET_AVATAR =
  API_BASE_URL + "userManagement/getUserImage/";
export const API_USERS_MANAGEMENT_GET_USER_INFO =
  API_BASE_URL + "userManagement/getUserInfo/";

//log
export const API_GET_ALL_LOGS_PER_USER =
  API_BASE_URL + "log/log_count_per_user/";
export const API_GET_USER_RULES_LOG = API_BASE_URL + "log/user_rules_log/";
export const API_GET_USER_TRACKING_LOG = API_BASE_URL + "log/user_tracks_log/";
export const API_GET_CREATED_USERS_LOG =
  API_BASE_URL + "log/created_users_per_admin/";
export const API_GET_ALL_SUPERVISORS =
  API_BASE_URL + "userManagement/getAllSupervisors/";
export const API_GET_MONTHLY_LOGS = API_BASE_URL + "log/logs_count_per_month/";
export const API_GET_PAGE_VIEW_LOGS =
  API_BASE_URL + "log/page_view_logs_count/";
