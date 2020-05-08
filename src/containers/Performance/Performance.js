import React from 'react';

import './Performance.css';

// Victory chart.
import { VictorySharedEvents, VictoryBar, VictoryLabel, VictoryPie } from 'victory';

// Global state.
import { useStore } from '../../hooks-store/store';

const Performance = (props) => {

    // Global state.
    const state = useStore()[0];

    // Data and labels chart.
    const data = [];
    const labels = [];
    const guide_names = [];

    // Empty state.
    let chart = <h1>¡Aún no tienes tareas terminadas ésta semana!</h1>;

    // Date 7 days ago.
    const date = new Date();
    date.setDate(date.getDate() - 7);

    // Task finished in las 7 days.
    let tasks = [];
    if (state.tasks) {
        tasks = state.tasks.filter(tasks => (
            tasks.status === 'FINISHED' && new Date(tasks.finish_date) >= date
        ));
    }

    // Format data to the charts.
    const createData = () => {
        if (tasks.length > 0) {
            tasks.forEach((task, index) => {
                guide_names.push(
                    <p key={index}>{'T' + (index + 1) + '=>  ' + task.name}</p>
                );
                const obj = {
                    x: "T" + (index + 1),
                    y: ((task.estimaded_time - task.remaining_time ) / 60000).toFixed(2)
                }
                data.push(obj);
                labels.push("T" + (index + 1));
            });
        }
    };

    // Create data on Startup.
    createData();

    // Create chart.
    if (tasks.length > 0) {
        chart = (
            <svg viewBox="0 0 850 360">
                <VictorySharedEvents
                    events={[{
                        childName: ["pie", "bar"],
                        target: "data",
                        eventHandlers: {
                            onMouseOver: () => {
                            return [{
                                childName: ["pie", "bar"],
                                mutation: (props) => {
                                return {
                                    style: Object.assign({}, props.style, {fill: "tomato"})
                                };
                                }
                            }];
                            },
                            onMouseOut: () => {
                            return [{
                                childName: ["pie", "bar"],
                                mutation: () => {
                                return null;
                                }
                            }];
                            }
                        }
                    }]}
                >
                <g transform={"translate(250, 80)"}>
                    <VictoryBar name="bar"
                        width={600}
                        standalone={false}
                        style={{
                        data: { width: 8 },
                        labels: {fontSize: 8}
                        }}
                        data={data}
                        labels={labels}
                        labelComponent={<VictoryLabel y={285}/>}
                    />
                </g>
                <g transform={"translate(0, -25)"}>
                    <VictoryPie name="pie"
                        width={380}
                        standalone={false}
                        style={{ labels: {fontSize: 10, padding: 10}}}
                        data={data}
                    />
                </g>
                </VictorySharedEvents>
            </svg>
        );
    }

    return (
        <div className="perfomance-task-container">
            {chart}
            {guide_names}
        </div>
    )
} 


export default Performance;