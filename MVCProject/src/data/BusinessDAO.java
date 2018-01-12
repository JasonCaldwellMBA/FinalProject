package data;

import java.util.List;

import entities.Business;
import entities.User;

public interface BusinessDAO {
	
	public List<Business> index(int bid);

	  public Business show(int bid);

	  public Business create(int uid, String todoJson);

	  public Business update(int uid, int tid, String todoJson);

	  public Boolean destroy(int uid, int tid);

}
