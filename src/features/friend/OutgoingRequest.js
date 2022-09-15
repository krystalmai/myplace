import React, { useEffect, useState } from "react";
import {
  Stack,
  Typography,
  Card,
  Box,
  Pagination,
  Grid,
  Container,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { getOutgoingFriendsRequests } from "./friendSlice";
import UserCard from "./UserCard";
import SearchInput from "../../components/SearchInput";

export default function OutgoingRequests() {
  const [filterName, setFilterName] = useState("");
  const [page, setPage] = useState(1);
  const { currentPageUsers, usersById, totalUsers, totalPages } = useSelector(
    (state) => state.friend
  );
  const users = currentPageUsers.map((userId) => usersById[userId]);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getOutgoingFriendsRequests({ filterName, page }));
  }, [filterName, page, dispatch]);

  const handleSubmit = (searchQuery) => {
    setFilterName(searchQuery);
  };

  const handlePageChange = (event, page) => {
    setPage(page);
  };
  return (
    <Container>
      <Card sx={{ p: 3 }}>
        <Typography variant="h5" sx={{ mb: 3 }}>
          Outgoing
        </Typography>
        <Stack spacing={2}>
          <Stack direction={{ xs: "column", md: "row" }} alignItems="center">
            <SearchInput handleSubmit={handleSubmit} />
            <Box sx={{ flexGrow: 1 }} />
            <Typography
              variant="subtitle"
              sx={{ color: "text.secondary", ml: 1 }}
            >
              {totalUsers > 1
                ? `${totalUsers} requests found`
                : totalUsers === 1
                ? `${totalUsers} request found`
                : "No request found"}
            </Typography>
            <Box sx={{ flexGrow: 1 }} />
            <Pagination
              count={totalPages}
              page={page}
              onChange={handlePageChange}
            />
          </Stack>
        </Stack>

        <Grid container spacing={3} my={1}>
          {users.map((user) => (
            <Grid key={user._id} item xs={12} md={4}>
              <UserCard profile={user} />
            </Grid>
          ))}
        </Grid>
      </Card>
    </Container>
  );
}
