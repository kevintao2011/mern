import { Calendar, Whisper, Popover, Badge } from 'rsuite';

import React from 'react'

function ActivityCalendar({Activities}) {
    function getTodoList(date,activities) {
        const day = date.getDate();
        //[[],[{ time: '10:30 am', title: 'Meeting' }]]
        // console.log(day,date,typeof date)
        let tdlist = []
        activities.forEach(activity=>{
            // console.log(`Compare ${String(new Date(activity.start_date)).slice(0,15)} and ${String(date).slice(0,15)}`)
            if((String(new Date(activity.start_date)).slice(0,15))===String(date).slice(0,15)){
                tdlist.push({ time:activity.start_time, title: activity.activity_name })
            }
        })
        // console.log(" ")
        return tdlist
    }
    function renderCell(date) {
        const list = getTodoList(date,Activities);
        const displayList = list.filter((item, index) => index < 2);
     

        if (list.length) {
            const moreCount = list.length - displayList.length;
            const moreItem = (
            <li>
                <Whisper
                placement="top"
                trigger="click"
                speaker={
                    <Popover>
                    {list.map((item, index) => (
                        <p key={index}>
                        <b>{item.time}</b> - {item.title}
                        </p>
                    ))}
                    </Popover>
                }
                >
                <a>{moreCount} more</a>
                </Whisper>
            </li>
            );

            return (
            <ul className="calendar-todo-list">
                {displayList.map((item, index) => (
                <li key={index}>
                    <Badge /> <b>{item.time}</b> - {item.title}
                </li>
                ))}
                {moreCount ? moreItem : null}
            </ul>
            );
        }

        return null;
    }
    return (
        <Calendar 
            renderCell={renderCell}
        />
    )
}

export default ActivityCalendar