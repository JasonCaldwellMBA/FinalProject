package data;

import java.util.List;

import entities.Business;
import entities.Certification;
import entities.Contact;

public interface BusinessDAO {
	
	public List<Business> index();

	  public Business show(int bid);

	  public Business create(String businessJson);

	  public Business update(int bid, String businessJson);

	  public Business destroy(int bid);

	Contact updateContact(int bid, int cid, String contactJson);

	Contact createContact(int bid, String contactJson);

	Contact showContact(int bid, int cid);
	
	public List<Certification> indexCert(int bid);

}
