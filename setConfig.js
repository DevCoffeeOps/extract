process.env.EXTRACT__GOOGLE_MAPS_API_KEY = "AIzaSyDHJ-yEf6DoelaAEaMvUZgvYuqOsn4G86o";
process.env.EXTRACT__KEYWORD = "running shoe stores";
process.env.EXTRACT__CITY_STATE = "Austin, Texas";
process.env.EXTRACT__OUTPUT_DIR = "output"

export const config = {
    EXTRACT__CITY_STATE: process.env.EXTRACT__CITY_STATE,
    EXTRACT__GOOGLE_MAPS_API_KEY: process.env.EXTRACT__GOOGLE_MAPS_API_KEY,
    EXTRACT__KEYWORD: process.env.EXTRACT__KEYWORD,
    EXTRACT__OUTPUT_DIR: process.env.EXTRACT__OUTPUT_DIR
}
