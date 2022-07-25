import { useQuery } from '@apollo/client';
import { ALL_AUTHORS } from '../queries';

const Authors = props => {
  const authorsResult = useQuery(ALL_AUTHORS);

  if (!props.show || authorsResult.loading) {
    return null;
  }

  return (
    <div>
      <h2>Authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>Born</th>
            <th>Books</th>
          </tr>
          {authorsResult.data.allAuthors.map(a => (
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.booksCount}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Authors;
