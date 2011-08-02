package module.c;

import java.util.HashMap;
import java.util.Map;




public class FormGenerator {
	
	private Map<String, String> htmlForms = new HashMap<String, String>();
	
	
	
	private String formA = "<div id=\"searchForm\"><form id=\"searchForm\" action=\"#\" method=\"get\"> " + 
				     "<label for=\"searchString\">Enter location (e.g., Kiev or 1600 Pennsylvania av, DC.):</label> " +
				     "<input type=\"text\" name=\"searchString\" size=\"35\"/> " +
				     "<input type=\"submit\" value=\"Search Location\"/>" +	
			      "</form></div>";
	private String formB = "<div id=\"searchForm\"><form id=\"searchForm\" action=\"#\" method=\"get\"> " + 
    				"<label for=\"searchString\">Search Location:</label> " +
    				"<input type=\"text\" name=\"searchString\" size=\"35\"/> " +
    				"<input type=\"submit\" value=\"Find Product\"/>" +	
    			"</form></div>";

	public FormGenerator(){
		htmlForms.put("form-a", formA);
		htmlForms.put("form-b", formB);
	}
	
	public String produceResponse(String searchString) throws Exception{
		System.out.println("####Received request for Search Form: " + searchString);
		if (htmlForms.containsKey(searchString)){
			return htmlForms.get(searchString);
		}
		throw new IllegalArgumentException("Form with name: " + searchString + " does not exist");
	}
}
