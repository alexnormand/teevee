<?php
/**
 * TV Show Parser
 */
class Parser {

  private $result;            
  private $trakt;

  /**
   * Constructor.
   *
   * @param string|int  the query string|the id of a tv show.
   */
  public function __construct($query) { 
    $this->traktApiKey = 'aeddefdbcdd7ca5a2b9855b940389ebe';

    if(is_int($query))
      $this->result = $this->getSeasons($query);              
    else if(is_array($query))
      $this->result = $this->getEpisodes($query['showid'], $query['season']);
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
    * Returns an array representation of a remote json api call.
    *
    * @param  string $url the url of the trakt api call.
    * @param  array $params request parameters.
    * @return array returns the value encoded in json in a PHP array.
    */
   private function getJSON($baseurl, $params) {
     $url = $baseurl . $this->traktApiKey . '/' . implode('/', $params);
     
     $ch = curl_init();          
     curl_setopt($ch, CURLOPT_URL, $url);
     curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
     curl_setopt($ch, CURLOPT_FOLLOWLOCATION, 1);
     curl_setopt($ch, CURLOPT_TIMEOUT, 40);
     curl_setopt($ch, CURLOPT_FAILONERROR, false); //trakt sends a 401 with 
     curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
     curl_setopt($ch, CURLOPT_SSL_VERIFYHOST, 0);     
     
     return json_decode(curl_exec($ch), true);
   }

   /**
    * Extract the list of TV Shows from the search results page.
    *
    * @param $query - the show we're searching for.
    * @return array an array containing the download links.
    */
   private function getTVShowList($query) {  
     $shows = $this->getJSON('http://api.trakt.tv/search/shows.json/', 
			     array($query));         

     return array_map(function($s){
	 return  array('id' => $s['tvdb_id'], 'title' => $s['title']);           
     }, $shows);
   }

   /**
    * Return the list of seasons of a tv show.
    * @param int $showid the id fo the show    
    * @return array the list of seasons
    */
   private function getSeasons($showid) {    
     $seasons = $this->getJSON('http://api.trakt.tv/show/seasons.json/',
			       array($showid));

     return array('seasons' => array_keys($seasons));
   }

   /**
    * Return the eposide of a given season for a tv show
    *
    * @param $showid 
    * @param $season 
    * @return array an array containing the list of episodes.
    */
   private function getEpisodes($showid, $season) {         
     $episodes = $this->getJSON('http://api.trakt.tv/show/season.json/',
				array($showid,$season));
         
     return array_map(function($e) use($showid) {	 
	 return  array('id'       => $e['episode'],		       
		       'showid'   => $showid,
		       'season'   => $e['season'],
		       'title'    => $e['title'],
		       'airdate'  => date('r', $e['first_aired']),
		       'overview' => $e['overview'],
		       'image'    => $e['images']['screen'] ?: '');
     }, $episodes);
   }
       
}
