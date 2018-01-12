package data;

import java.util.List;

import entities.Vehicle;

public interface VehicleDAO {
	public List<Vehicle> index(int id);
	public Vehicle show(int uid, int vid); 
	public Vehicle create(int uid, String json); 
	public Vehicle update(int uid, int vid, String json);
	public Vehicle destroy(int uid, int vid);
}	
