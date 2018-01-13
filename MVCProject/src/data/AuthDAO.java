package data;

import entities.Business;
import entities.User;

public interface AuthDAO {
	public User register(String json); 
	public User login(String json);
	public Business registerBusiness(String json);
	public Business loginBusiness(String json); 
}
