package data;

import java.util.List;

import entities.User;

public interface UserDAO {
	
	public List<User> index(int uid);

	  public User show(int uid);
	  public User create(String json);
	  public User update(int uid, String json);
	  public User destroy(int uid);
}
