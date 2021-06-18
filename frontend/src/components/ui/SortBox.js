import React, { useEffect, useState } from "react";
import classes from "./SortBox.module.css";

const SortBox = ({ header, items, setSortMethod, ...rest }) => {
  const [selectedSortText, setSelectedSortText] = useState();

  const funcToItem = (sortMethodName) => {
    setSelectedSortText(sortMethodName);
    // Get sort method for item's text
    switch (sortMethodName) {
      case "role":
        return setSortMethod(() => sortByRole);
      case "alphabetical":
        return setSortMethod(() => sortByName);
      case "creationDate":
        return setSortMethod(() => sortByCreationDate)
      case "":
        break;
    }
  };

  // Set default sort method
  useEffect(() => {
    if (!items) return;
    setSortMethod(funcToItem(items[0].sortMethodName));
  }, []);

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
  };

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
  };

  const sortByCreationDate = (setData) => {
    setData((prevData) => {
      return prevData.sort((a, b) => {
        return Date.parse(b.date) - Date.parse(a.date)
      }).slice();
    });
  };

  // Handlers
  function sortHandler(e) {
    // Get text from clicked span
    const sortText = e.target.innerText;
    const [item] = items.filter(item => item.text === sortText) 
    // Return sort function
    funcToItem(item.sortMethodName);
  }

  return (
    <div {...rest} className={classes.main}>
      <h3>{header}</h3>
      <ul className={classes.sortList}>
        {items &&
          items.map((item) => {
            return (
              <li
                key={item.text}
                className={
                  item.sortMethodName === selectedSortText ? classes.selected : undefined
                }
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
