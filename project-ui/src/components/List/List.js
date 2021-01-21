import { useContext } from 'react';
import { ListGroup } from 'react-bootstrap';
import { AuthContext } from '../../App';

function List() {
    const authValue = useContext(AuthContext);
    const { user } = authValue;

    return (
        <div className="List">
                <ListGroup variant="flush">
                    {!user && (
                        <></>
                    )}
                    {user && (
                        user.friendList.map(person => (
                            <ListGroup.Item>{person.username}</ListGroup.Item>
                        ))
                    )}
                </ListGroup>
        </div>
    )
}

export default List;