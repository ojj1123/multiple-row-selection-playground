import React from "react";

import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemButton from "@mui/material/ListItemButton";
import { Checkbox, ListItemIcon } from "@mui/material";
import { makeData, Person } from "./make-data";

export default function App() {
  const [data] = React.useState<Person[]>(() => makeData(100));
  const [checked, setChecked] = React.useState<Set<string>>(() => new Set());

  const lastSelectedId = React.useRef<string | null>(null);

  const handleToggle = (id: string) => (event: React.MouseEvent<HTMLDivElement>) => {
    if (lastSelectedId.current === null) {
      lastSelectedId.current = id;
    }

    if (event.shiftKey) {
      const currentIndex = data.findIndex((item) => item.id === id);
      const lastSelectedIndex = data.findIndex((item) => item.id === lastSelectedId.current);

      if (currentIndex === -1 || lastSelectedIndex === -1) {
        return;
      }

      const startIndex = Math.min(currentIndex, lastSelectedIndex);
      const endIndex = Math.max(currentIndex, lastSelectedIndex);

      setChecked((prev) => {
        const newChecked = new Set(prev);
        const currentChecked = newChecked.has(id);

        data.slice(startIndex, endIndex + 1).forEach((item) => {
          if (currentChecked) {
            newChecked.delete(item.id);
          } else {
            newChecked.add(item.id);
          }
        });

        return newChecked;
      });
    } else {
      setChecked((prev) => {
        const newChecked = new Set(prev);
        newChecked.has(id) ? newChecked.delete(id) : newChecked.add(id);

        return newChecked;
      });
    }

    lastSelectedId.current = id;
  };

  return (
    <Container maxWidth="md">
      <Typography variant="h4" component="h1">
        Demo of a list with multiple selection
      </Typography>

      <Typography>
        Press <Typography component="kbd">Shift</Typography> and then{" "}
        <Typography component="kbd">Click</Typography> to select a range of items.
      </Typography>

      <Typography variant="subtitle1">{checked.size} selected</Typography>

      <List>
        {data.map((item) => {
          return (
            <ListItem key={item.id}>
              <ListItemButton onClick={handleToggle(item.id)}>
                <ListItemIcon>
                  <Checkbox checked={checked.has(item.id)} />
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
