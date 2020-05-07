import React from 'react';
import { VictorySharedEvents, VictoryBar, VictoryLabel, VictoryPie } from 'victory';

import './Performance.css';

import { useStore } from '../../hooks-store/store';

const Performance = (props) => {

    const state = useStore()[0];

    const data = [];
    const labels = [];

    const guide_names = [];
    let chart = <h1>¡Aún no tienes tareas terminadas esta semana!</h1>;

    const date = new Date();
    date.setDate(date.getDate() - 7);

    const tasks = state.tasks.filter(tasks => (tasks.status === 'FINISHED' && tasks.finish_date >= date));

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

    createData();

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
                        data: { width: 10 },
                        labels: {fontSize: 10}
                        }}
                        data={data}
                        labels={labels}
                        labelComponent={<VictoryLabel y={285}/>}
                    />
                </g>
                <g transform={"translate(0, -75)"}>
                    <VictoryPie name="pie"
                        width={280}
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