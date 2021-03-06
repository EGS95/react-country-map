import { useState, useEffect } from "react";
import * as query from "@arcgis/core/rest/query";
import Query from "@arcgis/core/rest/support/Query";
import "../App.css";

export default function Sidebar({ zoomToMap }) {
  let [countries, setCountries] = useState([]);
  let [searchText, setSearchText] = useState("");
  let [loading, setLoading] = useState(false);
  let [searchHidden, setsearchHidden] = useState(false);
  let queryUrl =
    "https://services.arcgis.com/P3ePLMYs2RVChkJx/ArcGIS/rest/services/World_Countries/FeatureServer/0";

  useEffect(() => {
    handleSearch();
  }, []);

  const handleSearch = () => {
    if (searchText.trim() === "") {
      setCountries([]);
      return;
    }
    let queryObject = new Query();
    queryObject.where = `COUNTRY like '${searchText}%'`;
    queryObject.outFields = ["COUNTRY"];
    queryObject.returnGeometry = true;
    // queryObject.returnCentroid = true;
    setLoading(true);
    query
      .executeQueryJSON(queryUrl, queryObject)
      .then((results) => {
        let countriesArr = [];
        results.features.forEach((element, index) => {
          if (element.attributes.COUNTRY.trim() !== "")
            countriesArr.push({
              name: element.attributes.COUNTRY,
              coordinates: [
                element.geometry.centroid.longitude,
                element.geometry.centroid.latitude,
              ],
            });
        });
        let countryNames = countriesArr.map((item) => item.name);
        let distinctCountryNames = [...new Set(countryNames)];
        let validIndexes = distinctCountryNames.map((item) =>
          countryNames.lastIndexOf(item)
        );
        countriesArr = countriesArr.filter((item, index) =>
          validIndexes.includes(index)
        );
        setCountries(countriesArr);
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
        console.log(err);
      });
  };

  const handleInput = (e) => {
    setSearchText(e.target.value.trim());
    if (e.keyCode === 13) {
      handleSearch();
    }
  };

  const handleZoom = (item) => {
    // setCountries([]);
    setsearchHidden(true);
    zoomToMap(item.coordinates);
  };

  return (
    <div id="sidebar">
      <div id="search-container">
        <input
          type="text"
          placeholder="Enter country name"
          id="search-box"
          onKeyUp={handleInput}
          disabled={loading}
          onClick={() => setsearchHidden(false)}
        />
        <button id="submit" onClick={handleSearch} disabled={loading}>
          Search
        </button>
      </div>
      <div
        id="countries"
        className={searchHidden ? "countries hide" : "countries"}
      >
        {countries.length > 0 ? (
          countries.map((item, index) => (
            <h4 key={index} onClick={() => handleZoom(item)}>
              {item.name}
            </h4>
          ))
        ) : (
          <p>No results found</p>
        )}
      </div>
    </div>
  );
}
