package data;

import java.util.List;

import entities.Request;
import entities.User;

public interface RequestDAO {

	public List<Request> index(int rid);

	  public Request show(int rid);

	  public Request create(int rid, String requestJson);

	  public Request update(int rid, String requestJson);

	  public Boolean destroy(int rid);
}
