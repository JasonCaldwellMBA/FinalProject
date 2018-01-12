package data;

import java.io.IOException;
import java.util.List;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;

import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import com.fasterxml.jackson.core.JsonParseException;
import com.fasterxml.jackson.databind.JsonMappingException;
import com.fasterxml.jackson.databind.ObjectMapper;

import entities.User;

@Repository
@Transactional
public class UserDAOImpl implements UserDAO {
	
	@PersistenceContext
	private EntityManager em;

	@Override
	public List<User> index(int uid) {
		String query = "SELECT u FROM User u"; 
		return em.createQuery(query, User.class)
				.getResultList();
	}

	@Override
	public User show(int uid) {
		return em.find(User.class, uid); 
	}

	@Override
	public User create(int uid, String json) {
		ObjectMapper mapper = new ObjectMapper(); 
		User user = null; 
		try {
			user = mapper.readValue(json, User.class);
			em.persist(user);
		} catch (JsonParseException e) {
			e.printStackTrace();
		} catch (JsonMappingException e) {
			e.printStackTrace();
		} catch (IOException e) {
			e.printStackTrace();
		}
		return user;
	}

	@Override
	public User update(int uid, int tid, String todoJson) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public Boolean destroy(int uid, int tid) {
		// TODO Auto-generated method stub
		return null;
	}


}
