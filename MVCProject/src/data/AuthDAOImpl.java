package data;

import java.io.IOException;
import java.util.List;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import com.fasterxml.jackson.core.JsonParseException;
import com.fasterxml.jackson.databind.JsonMappingException;
import com.fasterxml.jackson.databind.ObjectMapper;

import entities.User;
@Transactional
@Repository
public class AuthDAOImpl implements AuthDAO {
	@PersistenceContext
	private EntityManager em; 
	@Autowired 
	private PasswordEncoder encoder; 
	@Override
	public User register(String json) {
		ObjectMapper mapper = new ObjectMapper(); 
		User user = null; 
		try {
			user = mapper.readValue(json, User.class);
			//security check to refuse user if username exists; 
			String query = "SELECT u FROM User u WHERE u.username = :username"; 
			List<User> list = em.createQuery(query, User.class)
				.setParameter("username", user.getUsername())
				.getResultList(); 
			if(list.size() > 0) {
				return null; 
			}else {
				final String encryptedPwd = encoder.encode(user.getPassword()); 
				user.setPassword(encryptedPwd);
				em.persist(user);
			}
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
	public User login(String json) {
		ObjectMapper mapper = new ObjectMapper(); 
		User user = null; 
		User retUser = null; 
		try {
			user = mapper.readValue(json, User.class);
			String userQuery = "SELECT u FROM User u WHERE u.username = :username"; 
			//run userQuery if no user check business 
			List<User> users = em.createQuery(userQuery, User.class)
					.setParameter("username", user.getUsername())
					.getResultList(); 
			if(users.size() == 1) {
				retUser = users.get(0);
				if(retUser.getUsername().equals(user.getUsername())) {
					if(encoder.matches(user.getPassword(), retUser.getPassword())) {
						return retUser; 
					}
					else {
						return null; 
					}
				}
			}
		} catch (JsonParseException e) {
			e.printStackTrace();
		} catch (JsonMappingException e) {
			e.printStackTrace();
		} catch (IOException e) {
			e.printStackTrace();
		}
		return null;	
	}
}
