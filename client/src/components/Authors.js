import { useMutation, useQuery } from '@apollo/client';
import { useRef, useState } from 'react';
import { ALL_AUTHORS, EDIT_BIRTHYEAR } from '../queries';

const Authors = props => {
  const authorsResult = useQuery(ALL_AUTHORS);
  const [editBirthYear] = useMutation(EDIT_BIRTHYEAR, {
    refetchQueries: [{ query: ALL_AUTHORS }],
  });
  const [birthYear, setBirthYear] = useState('');
  const selectedAuthor = useRef('');

  const handleSubmit = e => {
    e.preventDefault();
    editBirthYear({
      variables: { name: selectedAuthor.current, setBornTo: Number(birthYear) },
    });
    setBirthYear('');
  };

  if (!props.show || authorsResult.loading) {
    return null;
  }

  return (
    <>
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
      <div>
        <form onSubmit={handleSubmit}>
          <h2>Set birth year</h2>
          {`Author: `}
          <select onChange={e => (selectedAuthor.current = e.target.value)}>
            {authorsResult.data.allAuthors.map(a => (
              <option key={a.name} value={a.name}>
                {a.name}
              </option>
            ))}
          </select>
          <div>
            {`Born: `}
            <input
              value={birthYear}
              onChange={e => setBirthYear(e.target.value)}
            />
          </div>
          <input type="submit" value="Update Author" />
        </form>
      </div>
    </>
  );
};

export default Authors;
