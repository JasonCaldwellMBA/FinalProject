package data;

import java.util.List;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;

import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import entities.User;

@Repository
@Transactional
public class UserDAOImpl implements UserDAO {
	
	@PersistenceContext
	private EntityManager em;

	@Override
	public List<User> index(int uid) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public User show(int uid, int tid) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public User create(int uid, String todoJson) {
		// TODO Auto-generated method stub
		return null;
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
