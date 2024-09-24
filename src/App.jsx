import React, { useState } from "react";
import Nav from './Nav'
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import {
  faEllipsisV,
  faPlus,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import { IconButton, TextField, Button, Menu, MenuItem } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const initialData = {
  columns: {
    "in-progress": {
      id: "in-progress",
      title: "In Progress",
      items: [
        {
          id: "item-1",
          content: "Review Javascript Code",
          comments: 12,
          badgeText: "UX",
          badgeType: "success",
          dueDate: "5 April",
          attachments: 4,
          assigned: ["12.png", "5.png"],
          members: ["Bruce", "Clark"],
        },
        {
          id: "item-2",
          content: "Research FAQ page UX",
          comments: 8,
          badgeText: "Design",
          badgeType: "warning",
          dueDate: "10 April",
          attachments: 2,
          assigned: ["6.png"],
          members: ["Alice"],
        },
      ],
    },
    "in-review": {
      id: "in-review",
      title: "In Review",
      items: [
        {
          id: "item-3",
          content: "Review complete Apps",
          comments: 4,
          badgeText: "App",
          badgeType: "info",
          dueDate: "12 April",
          attachments: 3,
          assigned: ["8.png"],
          members: ["John"],
        },
        {
          id: "item-4",
          content: "Find new images for pages",
          comments: 10,
          badgeText: "Images",
          badgeType: "success",
          dueDate: "15 April",
          attachments: 5,
          assigned: ["4.png"],
          members: ["Sarah"],
        },
      ],
    },
    done: {
      id: "done",
      title: "Done",
      items: [
        {
          id: "item-5",
          content: "Forms & Tables section",
          comments: 5,
          badgeText: "Forms",
          badgeType: "primary",
          dueDate: "20 April",
          attachments: 6,
          assigned: ["9.png"],
          members: ["Mike"],
        },
        {
          id: "item-6",
          content: "Complete Chart's and Map",
          comments: 3,
          badgeText: "Charts",
          badgeType: "secondary",
          dueDate: "22 April",
          attachments: 1,
          assigned: ["2.png"],
          members: ["Linda"],
        },
      ],
    },
  },
  columnOrder: ["in-progress", "in-review", "done"],
};

const App = () => {
  const [data, setData] = useState(initialData);
  const [isAdding, setIsAdding] = useState(null);
  const [newItemContent, setNewItemContent] = useState("");
  const [newColumnTitle, setNewColumnTitle] = useState("");
  const [anchorEl, setAnchorEl] = useState(null);
  const [currentItemId, setCurrentItemId] = useState(null);
  const [currentColumnId, setCurrentColumnId] = useState(null);
  const [notification, setNotification] = useState(null);



  const onDragEnd = (result) => {
    console.log(result);
    
    const { destination, source } = result;  
    if (!destination) return;

    if (destination.droppableId === source.droppableId) {
      const column = data.columns[source.droppableId];
      const newItems = Array.from(column.items);
      const [movedItem] = newItems.splice(source.index, 1);
      newItems.splice(destination.index, 0, movedItem);

      const updatedColumn = {
        ...column,
        items: newItems,
      };

      setData((prevData) => ({
        ...prevData,
        columns: {
          ...prevData.columns,
          [updatedColumn.id]: updatedColumn,
        },
      }));
      return;
    }

    //  for columns -----

    const startColumn = data.columns[source.droppableId];
    const finishColumn = data.columns[destination.droppableId];

    const startItems = Array.from(startColumn.items);
    const [movedItem] = startItems.splice(source.index, 1);

    const finishItems = Array.from(finishColumn.items);
    finishItems.splice(destination.index, 0, movedItem);

    const updatedStart = {
      ...startColumn,
      items: startItems,
    };

    const updatedFinish = {
      ...finishColumn,
      items: finishItems,
    };

    setData((prevData) => ({
      ...prevData,
      columns: {
        ...prevData.columns,
        [updatedStart.id]: updatedStart,
        [updatedFinish.id]: updatedFinish,
      },
    }));

    setNotification(
      `Item moved from "${startColumn.title}" to "${finishColumn.title}"`
    );
    setTimeout(() => setNotification(null), 2000);
  };

  const handleAddItemClick = (columnId) => {
    setIsAdding(isAdding === columnId ? null : columnId);
    setCurrentColumnId(columnId);
  };

  const handleAddItemSubmit = () => {
    if (newItemContent.trim() === "" || !currentColumnId) return;

    const newItem = {
      id: `item-${Date.now()}`,
      content: newItemContent,
      comments: 0,
      badgeText: "New",
      badgeType: "default",
      dueDate: "N/A",
      attachments: 0,
      assigned: [],
      members: [],
    };

    const column = data.columns[currentColumnId];
    const updatedColumn = {
      ...column,
      items: [...column.items, newItem],
    };

    setData((prevData) => ({
      ...prevData,
      columns: {
        ...prevData.columns,
        [currentColumnId]: updatedColumn,
      },
    }));

    setNewItemContent("");
    setIsAdding(null);
    setCurrentColumnId(null);
  };

  const handleAddColumnSubmit = () => {
    if (newColumnTitle.trim() === "") return;

    const newColumnId = `column-${Date.now()}`;
    const newColumn = {
      id: newColumnId,
      title: newColumnTitle,
      items: [],
    };

    setData((prevData) => ({
      ...prevData,
      columns: {
        ...prevData.columns,
        [newColumnId]: newColumn,
      },
      columnOrder: [...prevData.columnOrder, newColumnId],
    }));

    setNewColumnTitle("");
  };

  const handleItemInputChange = (event) => {
    setNewItemContent(event.target.value);
  };

  const handleColumnInputChange = (event) => {
    setNewColumnTitle(event.target.value);
  };

  const handleMenuClick = (event, itemId) => {
    setAnchorEl(event.currentTarget);
    setCurrentItemId(itemId);
  };

  const handleDelete = () => {
    if (currentItemId) {
      const newData = { ...data };
      Object.keys(newData.columns).forEach((columnId) => {
        newData.columns[columnId].items = newData.columns[
          columnId
        ].items.filter((item) => item.id !== currentItemId);
      });
      setData(newData);
      setAnchorEl(null);
      setCurrentItemId(null);
    }
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
    setCurrentItemId(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-menu" : undefined;

  return (
    <>
      <Nav />
      <DragDropContext onDragEnd={onDragEnd}>
        <div className="container">
          <div className="row mt-5">
            {notification && (
              <div
                className="notification"
                style={{
                  position: "fixed",
                  bottom: 20,
                  left: 600,
                  padding: 10,
                  backgroundColor: "#222",
                  color: "#fff",
                  borderRadius: 5,
                  textAlign: "center",
                  width: 500,
                }}
              >
                {notification}
              </div>
            )}
            {data.columnOrder.map((columnId) => {
              const column = data.columns[columnId];

              return (
                <div key={column.id} className="col-lg-3">
                  <div className="d-flex flex-column mx-2 mb-2">
                    <div className="d-flex justify-content-between align-items-center mb-2">
                      <h4>{column.title}</h4>
                      <div className="add-item-container">
                        {isAdding === column.id ? (
                          <div className="add-item-form">
                            <TextField
                              fullWidth
                              placeholder="Enter item content"
                              value={newItemContent}
                              onChange={handleItemInputChange}
                              autoFocus
                            />
                            <Button
                              variant="contained"
                              color="primary"
                              onClick={handleAddItemSubmit}
                            >
                              Add Item
                            </Button>
                            <Button
                              variant="outlined"
                              color="secondary"
                              onClick={() => setIsAdding(null)}
                            >
                              Cancel
                            </Button>
                          </div>
                        ) : (
                          <Button
                            variant="contained"
                            color="primary"
                            onClick={() => handleAddItemClick(column.id)}
                            startIcon={<FontAwesomeIcon icon={faPlus} />}
                          >
                            Add Item
                          </Button>
                        )}
                      </div>
                    </div>  
                    <Droppable droppableId={column.id}>
                      {(provided) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.droppableProps}
                        >
                          {column.items.map((item, index) => (
                            <Draggable
                              key={item.id}
                              draggableId={item.id}
                              index={index}
                            >
                              {(provided) => (
                                <div
                                  ref={provided.innerRef}
                                  {...provided.draggableProps}
                                  {...provided.dragHandleProps}
                                  className="kanban-item mb-3 p-3 bg-light rounded"
                                >
                                  <div className="d-flex justify-content-between flex-wrap align-items-center mb-2">
                                    <div className="item-badges">
                                      <div
                                        className={`badge bg-label-${item.badgeType} text-white bg-danger`}
                                      >
                                        {item.badgeText}
                                      </div>
                                    </div>
                                    <div className="dropdown kanban-tasks-item-dropdown">
                                      <IconButton
                                        onClick={(event) =>
                                          handleMenuClick(event, item.id)
                                        }
                                        aria-controls={id}
                                        aria-haspopup="true"
                                        aria-expanded={
                                          open ? "true" : undefined
                                        }
                                      >
                                        <FontAwesomeIcon icon={faEllipsisV} />
                                      </IconButton>
                                      <Menu
                                        id={id}
                                        anchorEl={anchorEl}
                                        open={open}
                                        onClose={handleCloseMenu}
                                      >
                                        <MenuItem onClick={handleDelete}>
                                          <FontAwesomeIcon icon={faTrash} />{" "}
                                          Delete
                                        </MenuItem>
                                      </Menu>
                                    </div>
                                  </div>
                                  <span className="kanban-text">
                                    {item.content}
                                  </span>
                                  <div className="d-flex justify-content-between align-items-center flex-wrap mt-2">
                                    <div className="d-flex">
                                      <span className="d-flex align-items-center me-2">
                                        <i className="ti ti-paperclip me-1"></i>
                                        <span className="attachments">
                                          {item.attachments}
                                        </span>
                                      </span>
                                      <span className="d-flex align-items-center ms-2">
                                        <i className="ti ti-message-2 me-1"></i>
                                        <span>{item.comments}</span>
                                      </span>
                                    </div>
                                  </div>
                                </div>
                              )}
                            </Draggable>
                          ))}
                          {provided.placeholder}
                        </div>
                      )}
                    </Droppable>
                  </div>
                </div>
              );
            })}

            <div className="col-lg-3">
              <div className="add-column-container mx-2 mt-3">
                <h5>Add New</h5>
                <TextField
                  fullWidth
                  placeholder="Enter new column title"
                  value={newColumnTitle}
                  onChange={handleColumnInputChange}
                  autoFocus
                />
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleAddColumnSubmit}
                >
                  Add Column
                </Button>
              </div>
            </div>
          </div>
        </div>
      </DragDropContext>
    </>
  );
};

export default App;






