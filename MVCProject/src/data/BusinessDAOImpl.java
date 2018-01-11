package data;

import java.util.List;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;

import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import entities.Business;

@Repository
@Transactional
public class BusinessDAOImpl implements BusinessDAO {
	
	@PersistenceContext
	private EntityManager em;

	@Override
	public List<Business> index(int uid) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public Business show(int uid, int tid) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public Business create(int uid, String todoJson) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public Business update(int uid, int tid, String todoJson) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public Boolean destroy(int uid, int tid) {
		// TODO Auto-generated method stub
		return null;
	}

	
}
