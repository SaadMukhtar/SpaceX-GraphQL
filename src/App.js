import React from "react";
import { useQuery, gql } from "@apollo/client";

const QUERY = gql`
  {
    launchesPast(limit: 109) {
      id
      mission_name
      launch_year
      launch_date_utc
      rocket {
        rocket_name
      }
    }
  }
`;

export default function App() {
  const { data, loading, error } = useQuery(QUERY);
  if (data) console.log(data);

  if (loading) return "Loading...";
  if (error) return <pre>{error.message}</pre>;

  return (
    <>
      <div>
        <h1>SpaceX Launches</h1>
        <h2>Past 109 Launches</h2>
        <table className="table table-hover">
          <thead>
            <tr>
              <th scope="col">ID</th>
              <th scope="col">Mission Name</th>
              <th scope="col">Launch Year</th>
              <th scope="col">Rocket Name</th>
            </tr>
          </thead>
          <tbody>
            {data.launchesPast.map((launch) => (
              <tr className="table-dark" key={launch.id}>
                <td>{launch["id"]}</td>
                <td>{launch["mission_name"]}</td>
                <td>{launch["launch_year"]}</td>
                <td>{launch["rocket"]["rocket_name"]}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
