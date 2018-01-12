package data;

import java.util.List;

import entities.Business;
import entities.User;

public interface BusinessDAO {
	
	public List<Business> index(int bid);

	  public Business show(int bid);

	  public Business create(int uid, String businessJson);

	  public Business update(int bid, String businessJson);

	  public Boolean destroy(int bid);

}
