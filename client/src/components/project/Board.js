import React, { useState } from "react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";

import AddTask from "./board/AddTask";
import Task from "./board/Task";
import styles from "../../styles/components/project/Board.module.css";

import { useDispatch } from "react-redux";
import { bindActionCreators } from "redux";
import * as actionList from "../../action/actionList";
import { useSelector } from "react-redux";

export default function Board() {
  const dispatch = useDispatch();
  const { addCol, delCol, addTask, onDragEnd, saveData } = bindActionCreators(
    actionList, 
    dispatch
  );
  const { list: { board_id, board } , project: {is_admin} } = useSelector((state) => state);

  const [popupCol, setpopupCol] = useState(false);
  const [col, setcol] = useState("");
  const [popupAddTask, setpopupAddTask] = useState(false);
  const [popupTask, setpopupTask] = useState(false);

  return (
    <>
      {popupCol !== false ? (
        <div className={styles.containerPopup}>
          <div className={styles.popup}>
            <img
              src="/cancelButton.svg"
              alt="cancel"
              onClick={() => setpopupCol(false)}
            />
            <h1>Add Column</h1>

            <input value={col} onChange={(e) => setcol(e.target.value)} />
            <button
              onClick={() => {
                addCol(popupCol, col);
                setcol("");
                setpopupCol(false);
              }}
            >
              Add
            </button>
          </div>
        </div>
      ) : null}

      {popupAddTask ? (
        <AddTask view={setpopupAddTask} addTask={addTask} id={board_id} />
      ) : null}

      {popupTask !== false ? (
        <Task item={popupTask} view={setpopupTask} />
      ) : null}

      {board_id ?
        <div className={styles.container}>
          <div className={styles.containerHead}>
            <button onClick={() => setpopupAddTask(true)}>+</button>
            <h1>{board[board_id].title}</h1>
            {is_admin ? 
            <button onClick={() => saveData()}>✔</button>
            : null
            }
          </div>

          <div className={styles.mainContainer}>
            <DragDropContext
              onDragEnd={(result) => onDragEnd(result)}
            >
              {Object.entries(board[board_id].columns)
                .sort((a, b) => a[1].index - b[1].index)
                .map(([columnId, column]) => {
                  return (
                    <div className={styles.column} key={columnId}>
                      <div className={styles.columnHead}>
                        <h2>{column.name}</h2>
                        {columnId !== "Done" ? (
                          <button
                            className={styles.addBtn}
                            onClick={() => setpopupCol(columnId)}
                          >
                            +
                          </button>
                        ) : null}
                        {columnId !== "Done" && columnId !== "To do" ? (
                          <button
                            className={styles.removeBtn}
                            onClick={() => delCol(columnId)}
                          >
                            -
                          </button>
                        ) : null}
                      </div>

                      <Droppable droppableId={columnId} key={columnId}>
                        {(provided, snapshot) => {
                          return (
                            <div
                              {...provided.droppableProps}
                              ref={provided.innerRef}
                              className={styles.columnMain}
                              style={{
                                ...(snapshot.isDraggingOver && {
                                  background: "yellow",
                                }),
                              }}
                            >
                              {column.items.map((item, index) => {
                                return (
                                  <Draggable
                                    key={item.id}
                                    draggableId={item.id}
                                    index={index}
                                    // isDragDisabled
                                  >
                                    {(provided, snapshot) => {
                                      return (
                                        <div
                                          ref={provided.innerRef}
                                          {...provided.draggableProps}
                                          {...provided.dragHandleProps}
                                          className={styles.taskTile}
                                          style={{
                                            ...(snapshot.isDragging && {
                                              background: "hotpink",
                                            }),
                                            ...provided.draggableProps.style,
                                          }}
                                        >
                                          <p>{item.content}</p>
                                          <img
                                            src="/eye.png"
                                            alt="view"
                                            onClick={() => setpopupTask(item)}
                                          />
                                        </div>
                                      );
                                    }}
                                  </Draggable>
                                );
                              })}
                              {provided.placeholder}
                            </div>
                          );
                        }}
                      </Droppable>
                    </div>
                  );
                })}
            </DragDropContext>
          </div>
        </div>
        : <h1>Choose a board please</h1>
      }

    </>
  );
}
