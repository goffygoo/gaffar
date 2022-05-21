import React, { useState } from "react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";

import styles from '../../styles/components/project/Board.module.css'

import { useDispatch } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as actionTest from '../../action/actionBoard'
import { useSelector } from 'react-redux'

export default function Board() {
  const dispatch = useDispatch()
  const { setColumns, addCol, delCol, addTask } = bindActionCreators(actionTest, dispatch)
  const { columns } = useSelector(state => state.board)
  const [popup, setpopup] = useState(false)

  const onDragEnd = (result, columns, setColumns) => {
    if (!result.destination) return;
    const { source, destination } = result;

    if (source.droppableId !== destination.droppableId) {
      const sourceColumn = columns[source.droppableId];
      const destColumn = columns[destination.droppableId];
      const sourceItems = [...sourceColumn.items];
      const destItems = [...destColumn.items];
      const [removed] = sourceItems.splice(source.index, 1);
      destItems.splice(destination.index, 0, removed);
      setColumns({
        ...columns,
        [source.droppableId]: {
          ...sourceColumn,
          items: sourceItems
        },
        [destination.droppableId]: {
          ...destColumn,
          items: destItems
        }
      });
    } else {
      const column = columns[source.droppableId];
      const copiedItems = [...column.items];
      const [removed] = copiedItems.splice(source.index, 1);
      copiedItems.splice(destination.index, 0, removed);
      setColumns({
        ...columns,
        [source.droppableId]: {
          ...column,
          items: copiedItems
        }
      });
    }
  };

  return (
    <>
      {popup ?
        <div className={styles.containerPopup}>
          <div className={styles.popup}>
            <img src="/cancelButton.svg" alt='cancel'/>
            <h1>Add Project</h1>
          </div>
        </div>
        : null
      }
      <div style={{ display: "flex", justifyContent: "center", height: "100%" }}>
        <div>
          <input id="taskText"></input>
          <button onClick={() => {
            addTask(document.getElementById("taskText").value)
          }}>Click</button>
        </div>

        {columns ? <DragDropContext
          onDragEnd={result => onDragEnd(result, columns, setColumns)}
        >
          {Object.entries(columns).sort((a, b) => a[1].index - b[1].index).map(([columnId, column]) => {
            return (
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center"
                }}
                key={columnId}
              >
                <div style={{ display: "flex", flexDirection: "flex-row" }}>
                  <h2>{column.name}</h2>
                  {columnId !== "Done" ? <button onClick={() => addCol(columnId, document.getElementById('colText').value)}>+</button> : null}
                  {columnId !== "Done" && columnId !== "To do" ? <button onClick={() => delCol(columnId)}>-</button> : null}
                </div>

                <div style={{ margin: 8 }}>
                  <Droppable droppableId={columnId} key={columnId}>
                    {(provided, snapshot) => {
                      return (
                        <div
                          {...provided.droppableProps}
                          ref={provided.innerRef}
                          style={{
                            background: snapshot.isDraggingOver
                              ? "lightblue"
                              : "lightgrey",
                            padding: 4,
                            width: 150,
                            minHeight: 500
                          }}
                        >
                          {column.items.map((item, index) => {
                            return (
                              <Draggable
                                key={item.id}
                                draggableId={item.id}
                                index={index}
                              >
                                {(provided, snapshot) => {
                                  return (
                                    <div
                                      ref={provided.innerRef}
                                      {...provided.draggableProps}
                                      {...provided.dragHandleProps}
                                      style={{
                                        userSelect: "none",
                                        padding: 16,
                                        margin: "0 0 8px 0",
                                        minHeight: "50px",
                                        backgroundColor: snapshot.isDragging
                                          ? "#263B4A"
                                          : "#456C86",
                                        color: "white",
                                        ...provided.draggableProps.style
                                      }}
                                    >
                                      {item.content}
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
              </div>
            );
          })}
        </DragDropContext> : null}

        <div>
          <input id="colText"></input>
        </div>
      </div>
    </>
  );
}