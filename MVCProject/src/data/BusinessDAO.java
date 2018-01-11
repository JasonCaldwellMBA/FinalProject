package data;

import java.util.List;

import entities.Business;
import entities.User;

public interface BusinessDAO {
	
	public List<Business> index(int uid);

	  public Business show(int uid, int tid);

	  public Business create(int uid, String todoJson);

	  public Business update(int uid, int tid, String todoJson);

	  public Boolean destroy(int uid, int tid);

}
