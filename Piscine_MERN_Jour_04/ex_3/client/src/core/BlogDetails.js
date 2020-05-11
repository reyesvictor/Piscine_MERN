import React from "react";
import Layout from "./Layout";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";
import { isAuth } from "../auth/helpers";

const BlogDetails = ({ match, location }) => {

  const [error, setError] = React.useState(null);
  const [isLoaded, setIsLoaded] = React.useState(false);
  const [item, setItems] = React.useState([]);
  React.useEffect(() => {
    fetch(`${process.env.REACT_APP_API}/blog/billetEdit/${billet_id}/check/`)
      .then(res => res.json())
      .then(
        (result) => {
          console.log('=====billet=====', result);
          setIsLoaded(true);
          setItems(result.billet);
        },
        (error) => {
          setIsLoaded(true);
          setError(error);
        }
      )
  }, [])

  const [values, setValues] = React.useState({
    title: item.title,
    content: item.content,
    user_id: isAuth()._id,
    billet_id: match.params._id,
    buttonText: "Update"
  });

  const { title, content, password, user_id, billet_id, buttonText } = values;
  const handleChange = title => event => {
    setValues({ ...values, [title]: event.target.value });
  };

  const clickUpdate = (event) => {
    event.preventDefault();
    axios({
      method: 'POST',
      url: process.env.REACT_APP_API + "/blog/billetEdit/" + billet_id + "/edit",
      data: { _id: billet_id, title, content }
    })
      .then(response => {
        toast.success(response.data.message);
      })
      .catch(error => toast.error(error.response.data.error))
  };

  const billetInfo = () => (
    <>
    <div className="card" >
      <div className="card-header">
        Title: {item.title}
      </div>
      <ul className="list-group list-group-flush">
        <li className="list-group-item">Content: {item.content}</li>
        <li className="list-group-item">Created At: {item.createdAt}</li>
        <li className="list-group-item">Updated At: {item.updatedAt}</li>
      </ul>
    </div>
    </>
  );

  return (
    <Layout>
      <ToastContainer />
      <div className="row">
        <div className="mx-auto col-6">
          <div className="card mt-2">
            <div className="card-body">
              <h1 className="card-title p-5 text-center">{item.title}</h1>
              {billetInfo()}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );

}

export default BlogDetails;