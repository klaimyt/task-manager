import React, { useEffect, useState } from "react";
import classes from "./SortBox.module.css";

const SortBox = ({ header, items, setSortMethod }) => {
  const [selectedSortText, setSelectedSortText] = useState()

  const funcToItem = (sortText) => {
    setSelectedSortText(sortText)
    // Get sort method for item's text
    switch (sortText) {
      case "Role":
        return setSortMethod(() => sortByRole)
      case "Name":
        return setSortMethod(() => sortByName)
      case "":
        break;
    }
  }

  // Set default sort method
  useEffect(() => {
    if (!items) return
    setSortMethod(funcToItem(items[0].text))
  },[])
  
  // Sort functions
  const sortByRole = (setData) => {
    setData((prevData) => {
      return prevData
        .sort((a, b) => {
          if (a.secondaryText.toLowerCase() === b.secondaryText.toLowerCase())
            return 0;
          return a.secondaryText.toLowerCase() < b.secondaryText.toLowerCase()
            ? -1
            : 1;
        })
        .slice();
    });
  }

  const sortByName = (setData) => {
    setData((prevData) => {
      return prevData
        .sort((a, b) => {
          if (a.text.toLowerCase() < b.text.toLowerCase()) return -1;
          if (a.text.toLowerCase() > b.text.toLowerCase()) return 1;
          return 0;
        })
        .slice();
    });
  }

  // Handlers
  function sortHandler(e) {
    // Get text from clicked span
    const sortText = e.target.outerText;
    // Return sort function
    funcToItem(sortText)
  }

  return (
    <div className={classes.main}>
      <h3>{header}</h3>
      <ul className={classes.sortList}>
        {items &&
          items.map((item) => {
            return (
              <li
                key={item.text}
                className={item.text === selectedSortText ? classes.selected : undefined }
              >
                <span onClick={sortHandler}>{item.text}</span>
              </li>
            );
          })}
      </ul>
    </div>
  );
};

export default SortBox;
