package data;

import java.util.List;

import entities.Contact;
import entities.User;

public interface UserDAO {
	
		public List<User> index(int uid);

	  public User show(int uid);
	  public User create(String json);
	  public User update(int uid, String json);
	  public User destroy(int uid);

	  public Contact showContact(int uid, int cid);

	  public Contact createContact(int uid, String contactJson);

	  	public Contact updateContact(int uid, int cid, String contactJson);
}
