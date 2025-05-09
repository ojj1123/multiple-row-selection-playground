import React from "react";

import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemButton from "@mui/material/ListItemButton";
import { Checkbox, ListItemIcon } from "@mui/material";
import { makeData, Person } from "./make-data";
import { useMultipleSelection } from "./hooks/useMultipleSelection";

export default function App() {
  const [data] = React.useState<Person[]>(() => makeData(100));

  const { selected, handleToggle } = useMultipleSelection({
    data,
    getId: (item) => item.id,
  });

  return (
    <Container maxWidth="md">
      <Typography variant="h4" component="h1">
        Demo of a list with multiple selection
      </Typography>

      <Typography>
        Press <Typography component="kbd">Shift</Typography> and then{" "}
        <Typography component="kbd">Click</Typography> to select a range of items.
      </Typography>

      <Typography variant="subtitle1">{selected.size} selected</Typography>

      <List>
        {data.map((item) => {
          return (
            <ListItem key={item.id}>
              <ListItemButton onClick={handleToggle(item.id)}>
                <ListItemIcon>
                  <Checkbox checked={selected.has(item.id)} />
                </ListItemIcon>
                <ListItemText>
                  <Typography variant="subtitle2">
                    {item.firstName} {item.lastName}
                  </Typography>
                </ListItemText>
              </ListItemButton>
            </ListItem>
          );
        })}
      </List>
    </Container>
  );
}
