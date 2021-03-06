import React, { useState } from "react";
import "./Dnd.css";

function Dnd2() {
  const initialItems = [
    { id: 1, value: "drag", selected: false },
    { id: 2, value: "drag", selected: false },
    { id: 3, value: "drag", selected: false },
    { id: 4, value: "drag", selected: false },
    { id: 5, value: "drag", selected: false },
    {
      group: 1,
      isSelected: false,
      groupExpression: [
        { id: 6, value: "drag", selected: false },
        { id: 7, value: "drag", selected: false },
        { id: 8, value: "drag", selected: false },
        { id: 9, value: "drag", selected: false },
      ],
    },
    {
      group: 2,
      isSelected: false,
      groupExpression: [
        { id: 10, value: "drag", selected: false },
        { id: 11, value: "drag", selected: false },
      ],
    },
  ];
  const [items, setItems] = useState(initialItems);
  const [listCounter, setListCounter] = useState(items.length);
  // const [groupSelected, setGroupSelected] = useState("");
  const [multipleDragArray, setMultipleDragArray] = useState([]);
  const [dragData, setDragData] = useState([]);
  const [hoverItem, setHoverItem] = useState({});
  console.log("wholeData", items);
  // const [deleteSelected, setDeleteSelected] = useState("");

  // Handling drag data
  const handleDragStart = (e, item) => {
    e.stopPropagation();
    console.log("item", item);
    item.selected = true;
    setDragData([...dragData, item]);
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
    console.log("enter", dragData, item);
    setHoverItem(item);
  };
  const handleListItemDragOver = (e, item) => {
    e.preventDefault();
  };
  const handleListItemDrop = (e, hovereditem) => {
    console.log("hoverItem", dragData, hoverItem);
    //for group
    if (hoverItem.group) {
      console.log("hoveringongroup");
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
    if (!hoverItem.group) {
      const filteredArrayItems = items.filter(
        (listItem) => listItem.id !== dragData[0].id
      );
      console.log("hoverItemList", filteredArrayItems);
      const hoveredItemIndex = items.findIndex(
        (listItem) => listItem.id === hovereditem.id
      );
      const rearrangedArray = [...filteredArrayItems];
      console.log(...dragData);
      rearrangedArray.splice(hoveredItemIndex, 0, ...dragData);
      setItems([...rearrangedArray]);
    }
    if (multipleDragArray.length) {
      const filteredArray = items.filter((item) => !item.isSelected);
      setItems(filteredArray);
      setMultipleDragArray([]);
    }

    setDragData([]);
  };
  console.log("Multiple", multipleDragArray);

  // adding items
  // const selectGroupToAdd = (e, group) => {
  //   // console.log("groupSelected", group);
  //   setGroupSelected(group);
  // };
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
    item.groupExpression.push({
      id: 10,
      value: "drag 10",
      selected: false,
    });
  };
  const handleMultipleSelect = (e, item) => {
    item.isSelected = e.target.checked;
    const selectedArray = items.filter((listItem) => listItem.id === item.id);
    setMultipleDragArray((prevState) => [...prevState, ...selectedArray]);
  };
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
    <div style={{ width: '1000px', margin: '0 auto' }}>
      <button onClick={addItems}>Add list Items</button>
      <button onClick={groupItems}>Group Items Together</button>
      {/* <button onClick={deleteItems}>Delete list Items</button> */}
      {items.map((item) => {
        if (item.group) {
          return (
            <div
              className="group groupContainer"
              onDragEnter={(e) => handleListItemDragEnter(e, item)}
              onDragOver={(e) => handleListItemDragOver(e, item)}
              // onDragLeave={(e) => handleListItemDragLeave(e, item)}
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
              {item.groupExpression.map((itemsGrouped) => (
                <div className="rule-checker ">
                  <label>
                    <input
                      type="checkbox"
                      onChange={(e) => handleMultipleSelect(e, item)}
                      className="checkeditem"
                    />
                    <div className="item feature_bx">
                      <span>{itemsGrouped.id}</span>, {' '}
                      <span>{itemsGrouped.value} </span>
                    </div>
                  </label>
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
              <div className="rule-checker ">
                <label>
                  <input
                    type="checkbox"
                    onChange={(e) => handleMultipleSelect(e, item)}
                    className="checkeditem"
                  />
                  <div
                    className="item feature_bx"
                    draggable="true"
                    onDragStart={(e) => handleDragStart(e, item)}
                    onDragEnter={(e) => handleListItemDragEnter(e, item)}
                    onDragOver={(e) => handleListItemDragOver(e, item)}
                    // onDragLeave={(e) => handleListItemDragLeave(e, item)}
                    onDrop={(e) => handleListItemDrop(e, item)}
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
                    <span>{item.id}</span>, {' '}
                    <span>{item.value}</span>
                  </div>

                </label>
              </div>
            </>
          );
        }
      })}
    </div>
  );
}

export default Dnd2;
