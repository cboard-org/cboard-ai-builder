'use client'
import { Delete, DeleteOutline, Edit, EditOutlined } from "@mui/icons-material";
import { IconButton, ListItem, ListItemSecondaryAction, ListItemText } from "@mui/material";

export default function HistoryItem({text, date}:{text:string, date: string}) {
    return <>
    <ListItem disableGutters>
        <ListItemText primary={text} secondary={date}/>
        <ListItemSecondaryAction>
            <IconButton>
                <EditOutlined fontSize="small"/>
            </IconButton>
            <IconButton>
                <DeleteOutline fontSize="small"/>
            </IconButton>
        </ListItemSecondaryAction>
        
    </ListItem>
    </>
}