package data;

import java.util.List;

import entities.Request;

public interface RequestDAO {

	public List<Request> index(int uid);

	  public Request show(int uid, int rid);

	  public Request create(int uid, int vid, String requestJson);

	  public Request update(int uid, int vid, int rid, String requestJson);

	  public Request destroy(int uid, int vid, int rid);
}
