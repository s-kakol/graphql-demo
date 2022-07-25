import { gql, useQuery } from '@apollo/client';

const ALL_BOOKS = gql`
  query {
    allBooks {
      title
      published
      author
    }
  }
`;

const Books = props => {
  const booksResult = useQuery(ALL_BOOKS);

  if (!props.show || booksResult.loading) {
    return null;
  }

  return (
    <div>
      <h2>Books</h2>

      <table>
        <tbody>
          <tr>
            <th></th>
            <th>Author</th>
            <th>Published</th>
          </tr>
          {booksResult.data.allBooks.map(a => (
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author}</td>
              <td>{a.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Books;
