<?php
/**
 * TV Show Parser
 */
class Parser {

  private $result;            
  private $searchShow  = 'http://services.tvrage.com/feeds/search.php?show=';
  private $getEpisodes = 'http://services.tvrage.com/feeds/episode_list.php?sid=';
 
  /**
   * Constructor.
   *
   * @param string  the query string.
   * @param boolean Are we extracting info of a specific TV Show, if true the 
                    Parser will extract all of the info about a TV Show, if 
                    false the Parser will search for all TV Show matching the 
                    query.
   */
  public function __construct($query, $isTVShow=false) {   
    if($isTVShow) 
      $this->result = $this->getTVShowInfo($query);              
    else 
      $this->result = $this->getTVShowList($query);              
  }

   /**
    * Returns the result in json format.
    *
    * @return string the links in json format
    */
   public function __toString() {
     return json_encode($this->result);
   }

   /**
    * Extract the list of TV Shows from the search results page.
    *
    * @param $query - the show we're searching for.
    * @return array an array containing the download links.
    */
   private function getTVShowList($query) {                          
     $shows  = new SimpleXMLElement($this->searchShow . $query, NULL, TRUE);
     $result = array();

     foreach($shows->show as $show) 
       $result[(int) $show->showid] = (string) $show->name;       
          
     return $result;
   }


   /**
    * Extract a TV show's info (seasons, episodes,...) from the search results 
    * page.
    *
    * @param int $showID the TVRage showid
    * @return array an array containing the TV Show's info
    */
   private function getTVShowInfo($showID) {     
     $result = array();
     $doc = new DOMDocument();
     $doc->load($this->getEpisodes . $showID);
               
     foreach($doc->getElementsByTagName('Season') as $season) {
       $seasonEpisodeList = array();

       foreach($season->getElementsByTagName('episode') as $episode) {	 
	 $epnum   = $episode->getElementsByTagName('epnum')->item(0)->textContent;
	 $title   = $episode->getElementsByTagName('title')->item(0)->textContent;
	 $airdate = $episode->getElementsByTagName('airdate')->item(0)->textContent;	 		

	 $seasonepisodelist[$epnum] = array($title, $airdate);
       }

       $result[$season->getAttribute('no')] = $seasonepisodelist;
     }

     return $result;
   }
}
