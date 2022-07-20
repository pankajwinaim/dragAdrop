import React, { useState, useRef } from "react";
import "./Dnd.css";
import SelectCheckbox from "./SelectCheckbox";

function Dnd2() {
  const initialItems = [
    { id: 1, value: "drag 1", isSelected: false },
    { id: 2, value: "drag 2", isSelected: false },
    { id: 3, value: "drag 3", isSelected: false },
    { id: 4, value: "drag 4", isSelected: false },
    { id: 5, value: "drag 5", isSelected: false },
    {
      id: 6,
      group: "001",
      isSelected: false,
      groupExpression: [
        { id: 7, value: "drag 7", isSelected: false },
        { id: 8, value: "drag 8", isSelected: false },
        { id: 9, value: "drag 9", isSelected: false },
        { id: 10, value: "drag 10", isSelected: false },
      ],
    },
    // {
    //   id: 7,
    //   group: "002",
    //   isSelected: false,
    //   groupExpression: [
    //     { id: 11, value: "drag 11", selected: false },
    //     { id: 12, value: "drag 12", selected: false },
    //   ],
    // },
  ];
  const [items, setItems] = useState(initialItems);
  const [listCounter, setListCounter] = useState(items.length);
  const [groupSelected, setGroupSelected] = useState("");
  const [multipleDragArray, setMultipleDragArray] = useState([]);
  const [dragData, setDragData] = useState([]);
  const [hoverItem, setHoverItem] = useState({});
  const [totalListCount, setTotalListCount] = useState(0);
  const checkboxRef = useRef();
  console.log(checkboxRef?.current?.checked, "checkboxRef");
  console.log("wholeData", items);
  // const [deleteSelected, setDeleteSelected] = useState("");

  // Handling drag data
  const handleDragStart = (e, item, itemsGrouped) => {
    e.stopPropagation();
    console.log(itemsGrouped, item.group, "itemsGrouped");
    if (item.group && itemsGrouped) {
      console.log(item.group, "asd", itemsGrouped);
      setGroupSelected(item.group);
      setDragData([...dragData, itemsGrouped]);
    }
    if (item.group && !itemsGrouped) {
      console.log("groupItem", item);
      item.selected = true;
      setGroupSelected(null);
      setDragData([...dragData, item]);
      console.log("qwe");
    }
    if (!item.group) {
      item.selected = true;
      setDragData([...dragData, item]);
      console.log("qwe");
    }
    console.log(item);
  };
  console.log("DragData", dragData);
  const handleDragEnter = () => {
    console.log("dragEnter");
  };
  const handleDragOver = (e) => {
    e.preventDefault();
    console.log("dragOver", e);
  };
  const handleDragLeave = () => {
    console.log("handleDragLeave");
    // setDragData([]);
  };
  const handleDrop = () => {
    console.log("handleDrop", dragData);
    // setDragData([]);
  };

  //list item handle
  const handleListItemDragEnter = (e, item) => {
    // e.preventPropagation();
    // console.log("enter", dragData, item);
    setHoverItem(item);
  };
  const handleListItemDragOver = (e, item) => {
    e.preventDefault();
    console.log("enter", dragData, item);
  };
  const handleListItemDrop = (e, hovereditem) => {
    console.log("hoverItem", dragData, hoverItem);
    //for group
    if (hoverItem.group) {
      const filteredArrayItems = items.filter(
        (listItem) => listItem.id !== dragData[0].id
      );
      console.log("filteredArrayItems", filteredArrayItems);
      const hoveredGroupIndex = filteredArrayItems.findIndex(
        (item) => item.id === hovereditem.id
      );
      console.log("hoveredGroupIndex", hoveredGroupIndex);
      filteredArrayItems[hoveredGroupIndex].groupExpression.push(...dragData);
      setItems(filteredArrayItems);
    }
    if (!hoverItem.group && !groupSelected) {
      const filteredArrayItems = items.filter(
        (listItem) => listItem.id !== dragData[0].id
      );
      console.log("hoverItemList", filteredArrayItems);
      const hoveredItemIndex = items.findIndex(
        (listItem) => listItem.id === hovereditem.id
      );
      console.log("hoveredItemIndex", hoveredItemIndex);
      const rearrangedArray = [...filteredArrayItems];
      console.log(...dragData);
      rearrangedArray.splice(hoveredItemIndex, 0, ...dragData);
      setItems([...rearrangedArray]);
    }
    if (!hoverItem.group && groupSelected) {
      const indexOfGroupSelected = items.findIndex(
        (curr) => curr.group === groupSelected
      );
      const hoveredItemIndex = items.findIndex(
        (listItem) => listItem.id === hovereditem.id
      );
      console.log("hoveredItemIndex", hoveredItemIndex);
      console.log("indexOfGroupSelected", indexOfGroupSelected);
      const updatedGroup = items.find((item) => item.group === groupSelected);
      updatedGroup.groupExpression.splice(0, 1);
      console.log("updatedGroup", updatedGroup, items);
      const addItemToMain = items;
      console.log(dragData, "dragData");
      addItemToMain.splice(hoveredItemIndex, 0, ...dragData);
      setItems((prev) => prev);
      setGroupSelected(null);
    }
    if (multipleDragArray.length) {
      if (hovereditem.group) console.log("hello");
      const filteredArray = items.filter((item) => !item.isSelected);
      setItems(filteredArray);
      if (!hovereditem.group) {
        const filteredArrayItems = items.filter(
          (listItem) => listItem.id !== dragData[0].id
        );
        console.log("hoverItemList", filteredArrayItems);
        const hoveredItemIndex = items.findIndex(
          (listItem) => listItem.id === hovereditem.id
        );
        console.log("hoveredItemIndex", hoveredItemIndex);
        const rearrangedArray = [...filteredArrayItems];
        console.log(...dragData);
        rearrangedArray.splice(hoveredItemIndex, 0, ...dragData);
        setItems([...rearrangedArray]);
      }
      setMultipleDragArray([]);
      // checkboxRef.current.checked = false;
    }

    setDragData([]);
  };
  console.log("latestDragData", dragData);
  console.log("Multiple", multipleDragArray);
  console.log("groupSelected", groupSelected);
  const addItems = (e) => {
    e.preventDefault();
    setListCounter((prevState) => prevState + 1);
    setItems((prevState) => [
      ...prevState,
      {
        id: listCounter + 1,
        value: `drag ${listCounter + 1}`,
      },
    ]);
  };
  //handling multiple drag
  console.log("selected", multipleDragArray);
  const handleMultipleDrag = () => {
    console.log("hey");
    // const filteredArray = items.filter((item) => !item.isSelected);
    setDragData([...multipleDragArray]);
    // setItems(filteredArray);
  };
  //adding items to group
  const selectGroupToAdd = (e, item) => {
    console.log(item.group, "group");
    // item.groupExpression.push({
    //   id: 10,
    //   value: "drag 10",
    //   selected: false,
    // });
    setGroupSelected(item.group);
  };
  const handleMultipleSelect = (e, item) => {
    item.isSelected = e.target.checked;
    const selectedArray = items.filter(
      (listItem) => listItem.isSelected === true
    );
    console.log("selectedArray", item, items, selectedArray);
    setMultipleDragArray((prevState) => [...selectedArray]);
  };
  console.log(multipleDragArray, "multiple");
  //grouping Items
  const groupItems = () => {
    const selectedArray = items.filter((listItem) => listItem.isSelected);
    console.log("group", selectedArray);
    const updatedSelectedArray = selectedArray.map(
      (item) => (item.group = Math.random())
    );
    const unSelecteditemsArr = items.filter((item) => !item.isSelected);
  };

  return (
    <div>
      <button onClick={addItems}>Add list Items</button>
      <button onClick={groupItems}>Group Items Together</button>
      {/* <button onClick={deleteItems}>Delete list Items</button> */}
      {items.map((item, idx) => {
        if (item.group) {
          return (
            <div
              className="group groupContainer"
              onDragEnter={(e) => handleListItemDragEnter(e, item)}
              onDragOver={(e) => handleListItemDragOver(e, item)}
              // onDragLeave={(e) => handleListItemDragLeave(e, item)}
              onDragEnd={(e) => setDragData([])}
              onDrop={(e) => handleListItemDrop(e, item)}
              draggable="true"
              onDragStart={(e) => handleDragStart(e, item)}
              onClick={(e) => selectGroupToAdd(e, item)}
            >
              {multipleDragArray.length > 0 && multipleDragArray[0].group && (
                <div
                  className="selectedItemsModal"
                  draggable="true"
                  onDragStart={(e) => handleMultipleDrag(e, item)}
                >
                  {multipleDragArray.length} selected
                </div>
              )}
              {item.groupExpression.map((itemsGrouped, indexInGroup) => (
                <div
                  className="item"
                  onDragEnter={(e) => handleListItemDragEnter(e, itemsGrouped)}
                  onDragOver={(e) => handleListItemDragOver(e, itemsGrouped)}
                  // onDragLeave={(e) => handleListItemDragLeave(e, item)}
                  onDragEnd={(e) => setDragData([])}
                  onDrop={(e) => handleListItemDrop(e, itemsGrouped)}
                  draggable
                  onDragStart={(e) => handleDragStart(e, item, itemsGrouped)}
                >
                  {idx + 1 + indexInGroup}
                  <input
                    type="checkbox"
                    onChange={(e) => handleMultipleSelect(e, item)}
                    // ref={checkboxRef}
                  />
                  <span>{itemsGrouped.value}</span>
                </div>
              ))}
            </div>
          );
        } else {
          return (
            <>
              {multipleDragArray.length > 0 && !multipleDragArray[0].group && (
                <div
                  className="selectedItemsModal"
                  draggable="true"
                  onDragStart={(e) => handleMultipleDrag(e, item)}
                >
                  {multipleDragArray.length} selected
                </div>
              )}
              <div
                className="item"
                draggable="true"
                onDragStart={(e) => handleDragStart(e, item)}
                onDragEnter={(e) => handleListItemDragEnter(e, item)}
                onDragOver={(e) => handleListItemDragOver(e, item)}
                // onDragLeave={(e) => handleListItemDragLeave(e, item)}
                onDragEnd={(e) => setDragData([])}
                onDrop={(e) => handleListItemDrop(e, item)}
              >
                {idx + 1}
                <input
                  type="checkbox"
                  onChange={(e) => handleMultipleSelect(e, item)}
                  ref={checkboxRef}
                />
                {/* <SelectCheckbox selectedItem={item} dataList={items} /> */}
                <span>{item.value}</span>
              </div>
            </>
          );
        }
      })}
    </div>
  );
}

export default Dnd2;
