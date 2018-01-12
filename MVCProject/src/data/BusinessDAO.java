package data;

import java.util.List;

import entities.Business;
import entities.User;

public interface BusinessDAO {
	
	public List<Business> index();

	  public Business show(int bid);

	  public Business create(String businessJson);

	  public Business update(int bid, String businessJson);

	  public Boolean destroy(int bid);

}
