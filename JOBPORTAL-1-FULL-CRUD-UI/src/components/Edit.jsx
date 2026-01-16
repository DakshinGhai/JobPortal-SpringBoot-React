import React, { useEffect, useState } from "react";
import { Typography, TextField, Button, Paper, Box } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

const initial = {
  postId: "",
  postProfile: "",
  reqExperience: 0,
  postTechStack: [],
  postDesc: "",
};

const Edit = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [form, setForm] = useState(initial);
  const [currId] = useState(location.state.id);

  useEffect(() => {
    const fetchInitialPosts = async (id) => {
      try {
        const response = await axios.get(
          `http://localhost:8080/jobPost/${id}`
        );
        setForm(response.data);
      } catch (error) {
        console.error("Error fetching job post:", error);
      }
    };
    fetchInitialPosts(currId);
  }, [currId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const resp = await axios.put("http://localhost:8080/jobPost", form);
      console.log("Updated:", resp.data);
      navigate("/");
    } catch (error) {
      console.error("Error updating job post:", error);
    }
  };

  const handleChange = (e) => {
    const { value, checked } = e.target;

    if (checked) {
      setForm({ ...form, postTechStack: [...form.postTechStack, value] });
    } else {
      setForm({
        ...form,
        postTechStack: form.postTechStack.filter((skill) => skill !== value),
      });
    }
  };

  const skillSet = [
    { name: "Javascript" },
    { name: "Java" },
    { name: "Python" },
    { name: "Django" },
    { name: "Rust" },
  ];

  return (
    <Paper sx={{ padding: "1%" }} elevation={0}>
      <Typography sx={{ margin: "3% auto" }} align="center" variant="h5">
        Edit Job Post
      </Typography>

      <form autoComplete="off" noValidate onSubmit={handleSubmit}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            flexDirection: "column",
          }}
        >
          {/* Post ID (Disabled) */}
          <TextField
            sx={{ width: "50%", margin: "2% auto" }}
            label="Post ID"
            variant="outlined"
            value={form.postId}
            disabled
          />

          {/* Job Profile */}
          <TextField
            sx={{ width: "50%", margin: "2% auto" }}
            required
            onChange={(e) =>
              setForm({ ...form, postProfile: e.target.value })
            }
            label="Job Profile"
            variant="outlined"
            value={form.postProfile}
          />

          {/* Experience */}
          <TextField
            min="0"
            type="number"
            sx={{ width: "50%", margin: "2% auto" }}
            required
            onChange={(e) =>
              setForm({ ...form, reqExperience: Number(e.target.value) })
            }
            label="Years of Experience"
            variant="outlined"
            value={form.reqExperience}
          />

          {/* Description */}
          <TextField
            sx={{ width: "50%", margin: "2% auto" }}
            required
            multiline
            rows={4}
            onChange={(e) =>
              setForm({ ...form, postDesc: e.target.value })
            }
            label="Job Description"
            variant="outlined"
            value={form.postDesc}
          />

          {/* Skills */}
          <Box sx={{ margin: "1% auto", width: "50%" }}>
            <Typography variant="h6">Required Skills</Typography>
            <ul style={{ listStyle: "none", padding: 0 }}>
              {skillSet.map(({ name }, index) => (
                <li key={index}>
                  <label>
                    <input
                      type="checkbox"
                      value={name}
                      checked={form.postTechStack.includes(name)}
                      onChange={handleChange}
                    />
                    {" "}{name}
                  </label>
                </li>
              ))}
            </ul>
          </Box>

          <Button
            sx={{ width: "50%", margin: "2% auto" }}
            variant="contained"
            type="submit"
          >
            Update Post
          </Button>
        </Box>
      </form>
    </Paper>
  );
};

export default Edit;
