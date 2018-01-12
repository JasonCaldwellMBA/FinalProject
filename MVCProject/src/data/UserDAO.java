package data;

import java.util.List;

import entities.User;

public interface UserDAO {
	
	public List<User> index(int uid);

	  public User show(int uid);

	  public User create(int uid, String todoJson);

	  public User update(int uid, int tid, String todoJson);

	  public Boolean destroy(int uid, int tid);
}
