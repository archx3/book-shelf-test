/**
 * Created by ARCH on 2/16/17.
 * @Copyright (C) 2016
 * Barge Studios Inc, The Bumble-Bee Authors
 * <bargestd@gmail.com>
 * <bumble.bee@bargestd.com>
 *
 * @licence Licensed under the Barge Studios Eula
 *  you may not use this file except in compliance with the License.
 *
 * You may obtain a copy of the License at
 *     http://www.bargestudios.com/bumblebee/licence
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS-IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 *        \__/
 *    \  (-_-)  /
 *    \-( ___)-/
 *     ( ____)
 *   <-(____)->
 *    \      /
 * @fileOverview constructor and associated methods for creating and managing
 * a tabbed view
 * @requires {@link Barge.Utils, @link  Barge.String, @link  Barge.Object, < @link Barge.Timer}
 *
 *
 * @user msg: Some lines in this file use constructs from es6 or later
 */




(function (global, factory)
{
   if (typeof define === 'function' && define.amd)
   {
      // AMD. Register as an anonymous module unless amdModuleId is set
      define([], function ()
      {
         return (global['Barge.Ajax'] = factory(global));
      });
   }
   else if (typeof exports === 'object')
   {
      // Node. Does not work with strict CommonJS, but
      // only CommonJS-like environments that support module.exports,
      // like Node.
      module.exports = factory(global);
   }
   else
   {
      global['Barge.Ajax'] = factory(global);
   }
})(typeof window !== undefined ? window : this, function factory(window)
{
   "use strict";

   let Bu = Bee.Utils,
       Bo = Bee.Object;

   /**
    * @class
    */
   class Fetch
   {
      /**
       *
       * @param options {{baseUrl : String, data : {}, method  : "GET"} | null}
       * @constructor
       */
      constructor(options = null)
      {
         this.options = {
            baseUrl     : "",
            data        : null,
            method      : "GET",
            mode        : "same-origin", // no-cors, cors, *same-origin,
            credentials : "omit", // include, same-origin, *omit
            referrer    : "client", // no-referrer, *client
            headers     : {
               "Content-Type" : "application/json; charset=utf-8",
               // "Content-Type": "application/x-www-form-urlencoded",
            },
         };

         if (options)
         {
            this.options = Bo.extend(this.options, options);
         }

         this.request = null;
         return this;
      }

      static createRequest(url, data = {}, initOptions = {})
      {
         // Default options are marked with *
         let formData = null;

         if(!(initOptions["method"].toUpperCase() === "GET"))
         {
            formData = new FormData();
            for (let name in data)
            {
               if (data.hasOwnProperty(name))
               {
                  formData.append(name, data[name]);
               }
            }
         }

         let options = {
            method      : initOptions["method"], // *GET, POST, PUT, DELETE, etc.
            mode        : "same-origin", // no-cors, cors, *same-origin
            cache       : "default", // *default, no-cache, reload, force-cache, only-if-cached
            credentials : "omit", // include, same-origin, *omit
            headers     : Fetch.setHeaders(initOptions["headers"]),
            redirect    : "follow", // manual, *follow, error
            referrer    : "client", // no-referrer, *client
            //body: JSON.stringify(data), // body data type must match "Content-Type" header
            body        : formData, // body data type must match "Content-Type" header
         };

         options = Bo.extend(options, initOptions);
         return fetch(url, options)
            .then(function success(response) {return response.json();});

         // parses response to JSON
      }

      /**
       *
       * @param url
       * @param data
       * @param options
       * @returns {*}
       */
      post(url, data = {}, options = {})
      {
         options["method"] = "Post";
         return Fetch.createRequest(url, data, options)
      }

      /**
       *
       * @param url
       * @param data
       * @param options
       * @returns {*}
       */
      get(url, data = {}, options = {})
      {
         options["method"] = "GET";
         return Fetch.createRequest(url, data, options)
      }

      put(url, data = {}, options = {})
      {
         options["method"] = "PUT";
         return Fetch.createRequest(url, data, options)
      }

      delete(url, data = {}, options = {})
      {
         options["method"] = "DELETE";
         return Fetch.createRequest(url, data, options)
      }

      patch(url, data = {}, options = {})
      {
         options["method"] = "PATCH";
         return Fetch.createRequest(url, data, options)
      }

      /**
       * @private
       * @param object
       */
      makeQueryString(object)
      {
         let firstKey = Object.keys(object)[0];

         this.queryString = "?";

         this.queryString += firstKey + "=" + Ajax.encode(object[firstKey]);

         for (let key in object)
         {
            this.queryString += "&" + key + "=" + Ajax.encode(object[key]);
         }
      }

      /**
       *
       * @param object {{}}
       * @returns {string|string|*}
       */
      getQueryString(object)
      {
         this.makeQueryString(object);
         return this.queryString;
         //Object.keys(object).reduce(function (acc, item){//var prefix = ;//return (!acc ? '' : acc + '&') +
         // self.encode(item) + '=' + self.encode(object[item])//}, '') //msg Legacy code
      };

      /**
       *
       * @param value {String}
       * @returns {string}
       */
      static encode(value)
      {
         return encodeURIComponent(value);
      };

      /**
       *
       * @param value {String}
       * @returns {string}
       */
      static decode(value)
      {
         return decodeURIComponent(value);
      }

      /**
       *
       * @param headers
       * @returns {boolean}
       */
      static hasContentType(headers)
      {  //return Bu.defined(headers["Content-Type"])
         return Object.keys(headers).some(function (name) {return name.toLowerCase() === 'content-type';});
      };

      /**
       * @param xhr
       * @param headers
       * @returns {Ajax}
       */
      static setHeaders(xhr, headers = {})
      {
         let self = this;
         //headers = headers || {};
         if (!Ajax.hasContentType(headers))
         {
            headers['Content-Type'] = 'application/x-www-form-urlencoded';
         }
         let headersInstance = new Headers();
         Object.keys(headers).forEach(function (name)
                                      {
                                         //(headers[name] && self.request.setRequestHeader(name, headers[name]));
                                         headersInstance.append(name, headers[name]);
                                      });


         return headersInstance;
      };

      toQueryString(data)
      {  //this.makeQueryString(data);
         return Bu.isObject(data) ? this.getQueryString(data) : data;
      };
   }
   //going public whoop! whoop! lol
   return Bee.Fetch = Fetch;
});