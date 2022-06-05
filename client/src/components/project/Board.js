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
  const {
    list: { board_id, board },
    project: { is_admin },
  } = useSelector((state) => state);

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
              src="/close.png"
              alt="cancel"
              onClick={() => setpopupCol(false)}
            />
            <h1>Add Column</h1>

            <input
              value={col}
              spellCheck="false"
              onChange={(e) => {
                if (e.target.value.length > 20) return;

                setcol(e.target.value);
              }}
            />
            <div
              className={styles.addTaskBtnPop}
              onClick={() => {
                if (!col.trim()) return;

                addCol(popupCol, col);
                setcol("");
                setpopupCol(false);
              }}
            >
              <p>Add</p>
            </div>
          </div>
        </div>
      ) : null}

      {popupAddTask ? (
        <AddTask view={setpopupAddTask} addTask={addTask} id={board_id} />
      ) : null}

      {popupTask !== false ? (
        <Task item={popupTask} view={setpopupTask} />
      ) : null}

      {board_id ? (
        <div className={styles.container}>
          <div className={styles.containerHead}>
            {is_admin ? (
              <div
                className={styles.addTaskBtn}
                onClick={() => setpopupAddTask(true)}
              >
                <p>Add Task</p>
              </div>
            ) : null}
            <h1>{board[board_id].title}</h1>
            {is_admin ? (
              <div className={styles.saveBtn} onClick={() => saveData()}>
                <p>Save</p>
              </div>
            ) : null}
          </div>

          <div className={styles.mainContainer}>
            <DragDropContext onDragEnd={(result) => onDragEnd(result)}>
              {Object.entries(board[board_id].columns)
                .sort((a, b) => a[1].index - b[1].index)
                .map(([columnId, column]) => {
                  return (
                    <div className={styles.column} key={columnId}>
                      <div className={styles.columnHead}>
                        <h2
                          className={
                            columnId === "To do"
                              ? styles.todoHead
                              : columnId === "Done"
                              ? styles.doneHead
                              : ""
                          }
                        >
                          {column.name}
                        </h2>
                        {columnId !== "Done" ? (
                          <>
                            {is_admin ? (
                              <img
                                src="/plus.png"
                                alt="plus"
                                className={styles.addBtn}
                                onClick={() => setpopupCol(columnId)}
                              />
                            ) : null}
                          </>
                        ) : null}
                        {is_admin &&
                        columnId !== "Done" &&
                        columnId !== "To do" ? (
                          <img
                            src="/delete.svg"
                            alt="delete"
                            className={styles.removeBtn}
                            onClick={() => delCol(columnId)}
                          />
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
                                  background: "#F6E88A",
                                }),
                              }}
                            >
                              {column.items.map((item, index) => {
                                return (
                                  <Draggable
                                    key={item.id}
                                    draggableId={item.id}
                                    index={index}
                                    isDragDisabled={!is_admin}
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
                                              background: "#A193FE",
                                              borderRadius: "0.5rem",
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
      ) : (
        <h1 className={styles.warning}>Choose a board from List please !</h1>
      )}
    </>
  );
}
