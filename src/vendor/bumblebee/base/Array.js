/**
 * @Author Created by ARCH on 12/25/16.
 * @Copyright (C) 2016
 * Barge Studios Inc, The Bumble-Bee Authors
 * <bargestd@gmail.com>
 * <bumble.bee@bargestd.com>
 *
 * @licence Licensed under the Barge Studios Eula
 * you may not use this file except in compliance with the License.
 *
 * You may obtain a copy of the License at
 * http://www.bargestudios.com/bumblebee/licence
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
 *
 * @fileOverview This object contains static methods for manipulating Arrays
 * @user msg: Some lines in this file use constructs from es6 or later
 */
"use strict";

let Bu = require('./Utils');

  /**
   * @static
   * @type {{f}}
   */
  let _Array = {};
    //_this : this,
    /**
     * Utility for iterating over an array.
     * Calls a function for each element in an array. Skips holes in the array.
     * See {@link http://tinyurl.com/developer-mozilla-org-array-foreach}
     *
     * @param arr {Array}
     * @param fn {Function}
     * @param ctx {Function}
     */
_Array.forEach = function (arr, fn, ctx)
    { // modern browsers
      let arr2 = !Bu.isArray(arr) ? _Array.toArray(arr) : arr;

      if (!Array.prototype.forEach)
      {
        this.forEach = function (arr, fn, ctx)
        { // legacy
          let i    = 0,
              len  = arr.length;

          for (; i < len; i++)
          {
            if (fn.call(ctx, arr2[i], i, arr) === false) //has side effects
            {
              return i;
            }
          }
        };
      }
      else
      {
        return Array.prototype.forEach.call(arr2, fn, ctx);
      }
    };

    /**
     * Calls a function for each element in an array, starting from the last
     * element rather than the first.
     *
     * @param {Array<T>|string} arr Array or array
     *     like object over which to iterate.
     * @param {?function(this: S, T, number, ?): ?} fn The function to call for every
     *     element. This function
     *     takes 3 arguments (the element, the index and the array). The return
     *     value is ignored.
     * @param {S=} context The object to be used as the value of 'this'
     *     within f.
     * @template T,S
     */
  _Array.forEachRight = function (arr, fn, context)
    {
      let l = arr.length;  // must be fixed during loop... see docs
      let arr2 = Bu.isString(arr) ? arr.split('') : arr;
      for (let i = l - 1; i >= 0; --i)
      {
        if (i in arr2)
        {
          fn.call(/** @type {?} */ (context), arr2[i], i, arr);
        }
      }
    };

    /**
     *
     * @param list {Array}
     * @param fn {fn<param>} alias
     * @param alias
     * @param ctx
     */
  _Array.forEachAs = function(list, alias, fn, ctx)
    {
      for( alias of list)
      {
        fn.call(ctx, alias, list);
      }
    };

    /**
     * Calls a function for each element in an array and inserts the result into a
     * new array.
     *
     * See {@link http://tinyurl.com/developer-mozilla-org-array-map}
     * @param arr {Array|String} arr Array or array like object(eg. string)
     * @param fn {Function}
     * @param ctx {Function}
     * @returns {*|Array|{shadow}}
     */
  _Array.map     = function (arr, fn, ctx)
    {
      if (Array.prototype.map)
      {
        return arr.map(fn);
      }
      else
      {
        let l = arr.length;  // must be fixed during loop... see docs
        let res = new Array(l); // bad idea
        let arr2 = Bu.isString(arr) ? arr.split('') : arr;
        for (let i = 0; i < l; i++)
        {
          if (i in arr2)
          {
            res[i] = f.call(/** @type {?} */ (ctx), arr2[i], i, arr);
          }
        }
        return res;
      }
    };

    /**
     * Calls f for each element of an array. If any call returns true, some()
     * returns true (without checking the remaining elements). If all calls
     * return false, some() returns false.
     *
     * See {@link http://tinyurl.com/developer-mozilla-org-array-some}
     *
     * @param arr {Array | String}arr Array or array like object over which to iterate.
     * @param fn {Function} The function to call for for every element
     * @param ctx {Function} The object to be used as the value of 'this' within fn.
     * @returns {boolean} true if any element passes the test
     * @template T,S
     */
  _Array.someOf      = function (arr, fn, ctx)
    {
      if (Bu.defined(arr[0]))
      {
        let arr2 = Bu.isString(arr) ? arr.split('') : arr;

        if (!Array.prototype.some)
        {
          let l = arr.length;  // must be fixed during loop... see docs

          for (let i = 0; i < l; i++)
          {
            if (i in arr2 && f.call(/** @type {?} */ (ctx), arr2[i], i, arr))
            {
              return true;
            }
          }
          return false;
        }
        else
        {
          return arr2.some(fn);
        }
      }
      else
      {
        return false;
      }
    };

    /**
     * Calls f for each element of an array. If any call returns true, some()
     * returns true (without checking the remaining elements). If all calls
     * return false, some() returns false.
     *
     * See {@link http://tinyurl.com/developer-mozilla-org-array-some}
     *
     * @param arr {Array | String}arr Array or array like object over which to iterate.
     * @param fn {Function} The function to call for for every element
     * @param ctx {Function} The object to be used as the value of 'this' within fn.
     * @returns {boolean} true if any element passes the test
     * @template T,S
     */
  _Array.allOf      = function (arr, fn, ctx)
    {
      if (Bu.defined(arr[0]))
      {
        let arr2 = Bu.isString(arr) ? arr.split('') : arr;

        if (!Array.prototype.every)
        {

          let l = arr.length;  // must be fixed during loop... see docs

          for (let i = 0; i < l; i++)
          {
            if (i in arr2 && f.call(/** @type {?} */ (ctx), arr2[i], i, arr))
            {
              return false;
            }
          }
          return true;
        }
        else
        {
          return arr2.every(fn);
        }
      }
      else
      {
        return false;
      }
    };


    /**
     *
     * @param arr
     * @returns {*}Array}
     */
  _Array.shuffle     = function (arr)
    {
      let i = arr.length, j, temp;
      while (--i > 0)
      {
        j = Math.floor(Math.random() * (i + 1));
        temp = arr[j];
        arr[j] = arr[i];
        arr[i] = temp;
      }
      return arr;
    };

    /**
     * Returns the last element in an array without removing it.
     * @param {|string} array The array.
     * @returns {Array} Last item in array.
     */
  _Array.peek        = function (array)
    {
      return array[array.length - 1];
    };

    /**
     * @use Returns a new array of elements from arr, based on the indexes of elements
     * provided by index_arr. For example, the result of index copying
     * ['a', 'b', 'c'] with index_arr [1,0,0,2] is ['b', 'a', 'a', 'c'].
     *
     * @param {Array} arr The array to get a indexed copy from.
     * @param {Array <number>} index_arr An array of indexes to get from arr.
     * @returns {Array} A new array of elements from arr in index_arr order.
     */
  _Array.copyByIndex = function (arr, index_arr)
    {
      let result = [];
      this.forEach(index_arr, function (index)
      {
        result.push(arr[index]);
      });
      return result;
    };

    /**
     * Creates a new array for which the element at position i is an array of the
     * ith element of the provided arrays.  The returned array will only be as long
     * as the shortest array provided; additional values are ignored.  For example,
     * the result of zipping [1, 2] and [3, 4, 5] is [[1,3], [2, 4]].
     *
     * This is similar to the zip() function in Python.
     * See {@link http://docs.python.org/library/functions.html#zip}
     *
     * @param {!Array<?>} var_args Arrays to be combined.
     * @return {!Array<!Array<?>>} A new array of arrays created from provided arrays.
     */
    _Array.zip         = function (var_args)
    {
      //let i = 0;
      if (!arguments.length)
      {
        return [];
      }

      let result = [],
          minLen = arguments[0].length;

      for (let i = 1; i < arguments.length; i++)
      {
        if (arguments[i].length < minLen)
        {
          minLen = arguments[i].length;
        }
      }
      for (let i = 0; i < minLen; i++)
      {
        let value = [];
        for (let j = 0; j < arguments.length; j++)
        {
          value.push(arguments[j][i]);
        }
        result.push(value);
      }
      return result;
    };

    /**
     * Returns an array consisting of every argument with all arrays
     * expanded in-place recursively.
     *
     * @param {...*} var_args The values to flatten.
     * @return {!Array<?>} An array containing the flattened values.
     */
    _Array.flatten     = function (var_args)
    {
      let CHUNK_SIZE = 8192;
      let result = [];

      for (let i = 0; i < arguments.length; i++)
      {
        let element = arguments[i];
        if (Bu.isArray(element))
        {
          for (let c = 0; c < element.length; c += CHUNK_SIZE)
          {
            let chunk = _Array.slice(element, c, c + CHUNK_SIZE);
            let recurseResult = _Array.flatten.apply(null, chunk);
            for (let r = 0; r < recurseResult.length; r++)
            {
              result.push(recurseResult[r]);
            }
          }
        }
        else
        {
          result.push(element);
        }
      }
      return result;
    };

    /**
     * Returns an array consisting of the given value repeated N times.
     *
     * @param {VALUE} value The value to repeat.
     * @param {number} n The repeat count.
     * @return {!Array<VALUE>} An array with the repeated value.
     * @template VALUE
     */
    _Array.repeat      = function (value, n)
    {
      let array = [];
      for (let i = 0; i < n; i++)
      {
        array[i] = value;
      }
      return array;
    };

    /**
     * Creates a range of numbers in an arithmetic progression.
     *
     * Range takes 1, 2, or 3 arguments:
     * <pre>
     * range(5) is the same as range(0, 5, 1) and produces [0, 1, 2, 3, 4]
     * range(2, 5) is the same as range(2, 5, 1) and produces [2, 3, 4]
     * range(-2, -5, -1) produces [-2, -3, -4]
     * range(-2, -5, 1) produces [], since stepping by 1 wouldn't ever reach -5.
     * </pre>
     *
     * @param {number} startOrEnd The starting value of the range if an end argument
     *     is provided. Otherwise, the start value is 0, and this is the end value.
     *
     * @param {number=} [end] The optional end value of the range.
     * @param {number=} [step] The step size between range values. Defaults to 1
     *     if opt_step is undefined or 0.
     *
     * @return {!Array<number>} An array of numbers for the requested range. May be
     *     an empty array if adding the step would not converge toward the end
     *     value.
     */
    _Array.range       = function (startOrEnd, end, step)
    {
      let array = [],
          start = 0,
          endie   = startOrEnd,
          steppie  = step || 1,
          i     = 0;

      if (end !== undefined)
      {
        start = startOrEnd;
        endie = end;
      }

      if (steppie * (endie - start) < 0)
      {
        // Sign mismatch: start + step will never reach the end value.
        return [];
      }

      if (steppie > 0)
      {
        for (i = start; i < endie; i += steppie)
        {
          array.push(i);
        }
      }
      else
      {
        for (i = start; i > endie; i += steppie)
        {
          array.push(i);
        }
      }
      return array;
    };

    /**
     * Creates a new object built from the provided array and the key-generation
     * function.
     * @param {Array<T>} arr Array or array like object over
     *     which to iterate whose elements will be the values in the new object.
     * @param {?function(this:S, T, number, ?) : string} keyFunc The function to
     *     call for every element. This function takes 3 arguments (the element, the
     *     index and the array) and should return a string that will be used as the
     *     key for the element in the new object. If the function returns the same
     *     key for more than one element, the value for that key is
     *     implementation-defined.
     * @param {S=} opt_obj The object to be used as the value of 'this'
     *     within keyFunc.
     * @return {!Object<T>} The new object.
     * @template T,S
     */
    _Array.toObject    = function (arr, keyFunc, opt_obj)
    {
      let ret = {};
      this.forEach(arr, function (element, index)
      {
        ret[keyFunc.call(/** @type {?} */ (opt_obj), element, index, arr)] = element;
      });
      return ret;
    };

    /**
     *
     * @param arr {Array}
     * @param sortingFn {fn}
     * @param asc {Boolean}
     * @returns {*}
     */
    _Array.sort = function (arr, sortingFn, asc = true)
    {
      let len = arr.length;

      for (let i = 0; i < len; i++)
      {
        for (let j = 0; j < len; j++)
        {
          if (asc)
          {
            if (arr[j] > arr[j + 1])
            {
              sortingFn(arr, j, j + 1);
            }
          }
          else
          {
            if (arr[j] < arr[j + 1])
            {
              sortingFn(arr, j, j + 1);
            }
          }
        }
      }

      return arr;
    };

    /**
     * Tells if the array is sorted.
     * @param {!Array<T>} arr The array.
     * @param {?function(T,T):number=} opt_compareFn Function to compare the
     *     array elements.
     *     Should take 2 arguments to compare, and return a negative number, zero,
     *     or a positive number depending on whether the first argument is less
     *     than, equal to, or greater than the second.
     * @param {boolean=} opt_strict If true no equal elements are allowed.
     * @return {boolean} Whether the array is sorted.
     * @template T
     */
    _Array.isSorted    = function (arr, opt_compareFn, opt_strict)
    {
      let compare = opt_compareFn || this.defaultCompare;
      for (let i = 1; i < arr.length; i++)
      {
        let compareResult = compare(arr[i - 1], arr[i]);
        if (compareResult > 0 || compareResult === 0 && opt_strict)
        {
          return false;
        }
      }
      return true;
    };

    /**
     * Compares two arrays for equality. Two arrays are considered equal if they
     * have the same length and their corresponding elements are equal according to
     * the comparison function.
     *
     * @param {Array<?>} arr1 The first array to compare.
     * @param {Array<?>} arr2 The second array to compare.
     * @param {Function=} opt_equalsFn Optional comparison function.
     *     Should take 2 arguments to compare, and return true if the arguments
     *     are equal. Defaults to {link this .defaultCompareEquality} which
     *     compares the elements using the built-in '===' operator.
     * @return {boolean} Whether the two arrays are equal.
     */
    _Array.equals      = function (arr1, arr2, opt_equalsFn)
    {
      if (!Bu.isArrayLike(arr1) || !Bu.isArrayLike(arr2) || arr1.length !== arr2.length)
      {
        return false;
      }
      let l = arr1.length;
      let equalsFn = opt_equalsFn || this.defaultCompareEquality;
      for (let i = 0; i < l; i++)
      {
        if (!equalsFn(arr1[i], arr2[i]))
        {
          return false;
        }
      }
      return true;
    };

    /**
     * 3-way array compare function.
     * @param {!Array<VALUE>} arr1 The first array to
     *     compare.
     * @param {!Array<VALUE>} arr2 The second array to
     *     compare.
     * @param {function(VALUE, VALUE): number=} opt_compareFn Optional comparison
     *     function by which the array is to be ordered. Should take 2 arguments to
     *     compare, and return a negative number, zero, or a positive number
     *     depending on whether the first argument is less than, equal to, or
     *     greater than the second.
     * @return {number} Negative number, zero, or a positive number depending on
     *     whether the first argument is less than, equal to, or greater than the
     *     second.
     * @template VALUE
     */
    _Array.compare3 = function (arr1, arr2, opt_compareFn)
    {
      let compare = opt_compareFn || this.defaultCompare;
      let l = Math.min(arr1.length, arr2.length);
      for (let i = 0; i < l; i++)
      {
        let result = compare(arr1[i], arr2[i]);
        if (result !== 0)
        {
          return result;
        }
      }
      return this.defaultCompare(arr1.length, arr2.length);
    };

    /**
     * Compares its two arguments for order, using the built in < and >
     * operators.
     * @param {VALUE} a The first object to be compared.
     * @param {VALUE} b The second object to be compared.
     * @return {number} A negative number, zero, or a positive number as the first
     *     argument is less than, equal to, or greater than the second,
     *     respectively.
     * @template VALUE
     */
    _Array.defaultCompare = function (a, b)
    {
      return a > b ? 1 : a < b ? -1 : 0;
    };

    /**
     * Compares its two arguments for inverse order, using the built in < and >
     * operators.
     * @param {VALUE} a The first object to be compared.
     * @param {VALUE} b The second object to be compared.
     * @return {number} A negative number, zero, or a positive number as the first
     *     argument is greater than, equal to, or less than the second,
     *     respectively.
     * @template VALUE
     */
    _Array.inverseDefaultCompare = function (a, b)
    {
      return -this.defaultCompare(a, b);
    };

    /**
     * Compares its two arguments for equality, using the built in === operator.
     * @param {Object} a The first object to compare.
     * @param {Object} b The second object to compare.
     * @return {boolean} True if the two arguments are equal, false otherwise.
     */
    _Array.defaultCompareEquality = function (a, b)
    {
      return a === b;
    };

    /**
     * Inserts a value into a sorted array. The array is not modified if the
     * value is already present.
     * @param {Array<VALUE>} array The array to modify.
     * @param {VALUE} value The object to insert.
     * @param {function(VALUE, VALUE): number=} opt_compareFn Optional comparison
     *     function by which the array is ordered. Should take 2 arguments to
     *     compare, and return a negative number, zero, or a positive number
     *     depending on whether the first argument is less than, equal to, or
     *     greater than the second.
     * @return {boolean} True if an element was inserted.
     * @template VALUE
     */
    _Array.binaryInsert = function (array, value, opt_compareFn)
    {
      let index = this.binarySearch(array, value, opt_compareFn);
      if (index < 0)
      {
        this.insertAt(array, value, -(index + 1));
        return true;
      }
      return false;
    };

    /**
     * Removes a value from a sorted array.
     * @param {!Array<VALUE>} array The array to modify.
     * @param {VALUE} value The object to remove.
     * @param {function(VALUE, VALUE): number=} opt_compareFn Optional comparison
     *     function by which the array is ordered. Should take 2 arguments to
     *     compare, and return a negative number, zero, or a positive number
     *     depending on whether the first argument is less than, equal to, or
     *     greater than the second.
     * @return {boolean} True if an element was removed.
     * @template VALUE
     */
    _Array.binaryRemove = function (array, value, opt_compareFn)
    {
      let index = this.binarySearch(array, value, opt_compareFn);
      return (index >= 0) ? this.removeAt(array, index) : false;
    };

    /**
     * Splits an array into disjoint buckets according to a splitting function.
     * @param {Array<T>} array The array.
     * @param {function(this:S, T,number,Array<T>):?} sorter Function to call for
     *     every element.  This takes 3 arguments (the element, the index and the
     *     array) and must return a valid object key (a string, number, etc), or
     *     undefined, if that object should not be placed in a bucket.
     * @param {S=} opt_obj The object to be used as the value of 'this' within
     *     sorter.
     * @return {!Object} An object, with keys being all of the unique return values
     *     of sorter, and values being arrays containing the items for
     *     which the splitter returned that key.
     * @template T,S
     */
    _Array.bucket = function (array, sorter, opt_obj)
    {
      let buckets = {};

      for (let i = 0; i < array.length; i++)
      {
        let value = array[i];
        let key = sorter.call(/** @type {?} */ (opt_obj), value, i, array);
        if (Bu.defined(key))
        {
          // Push the value to the right bucket, creating it if necessary.
          let bucket = buckets[key] || (buckets[key] = []);
          bucket.push(value);
        }
      }

      return buckets;
    };

    // NOTE(arv): Since most of the array functions are generic it allows you to
// pass an array-like object. Strings have a length and are considered array-
// like. However, the 'in' operator does not work on strings so we cannot just
// use the array path even if the browser supports indexing into strings. We
// therefore end up splitting the string.

    /**
     * Returns the index of the first element of an array with a specified value, or
     * -1 if the element is not present in the array.
     *
     * See {@link http://tinyurl.com/developer-mozilla-org-array-indexof}
     *
     * @param {Array<T>|string} arr The array to be searched.
     * @param {T} obj The object for which we are searching.
     * @param {number=} opt_fromIndex The index at which to start the search. If
     *     omitted the search starts at index 0.
     * @return {number} The index of the first matching array element.
     * @template T
     */
    _Array.indexOf = function (arr, obj, opt_fromIndex)
    {
      if (!Array.prototype.indexOf)
      {
        let fromIndex = opt_fromIndex == null ? 0 :
                        (opt_fromIndex < 0 ? Math.max(0, arr.length + opt_fromIndex) : opt_fromIndex);

        if (Bu.isString(arr))
        {
          // Array.prototype.indexOf uses === so only strings should be found.
          if (!Bu.isString(obj) || obj.length !== 1)
          {
            return -1;
          }
          return arr.indexOf(obj, fromIndex);
        }

        for (let i = fromIndex; i < arr.length; i++)
        {
          if (i in arr && arr[i] === obj) return i;
        }
        return -1;
      }
      else
      {
        // arr.length != null;
        return Array.prototype.indexOf.call(arr, obj, opt_fromIndex);
      }
    };

    /**
     * Returns the index of the last element of an array with a specified value, or
     * -1 if the element is not present in the array.
     *
     * See {@link http://tinyurl.com/developer-mozilla-org-array-lastindexof}
     *
     * @param {!Array<T>|string} arr The array to be searched.
     * @param {T} obj The object for which we are searching.
     * @param {?number=} opt_fromIndex The index at which to start the search. If
     *     omitted the search starts at the end of the array.
     * @return {number} The index of the last matching array element.
     * @template T
     */
    _Array.lastIndexOf = function (arr, obj, opt_fromIndex)
    {
      let fromIndex;
      if (!Array.prototype.lastIndexOf)
      {
        fromIndex = opt_fromIndex == null ? arr.length - 1 : opt_fromIndex;

        if (fromIndex < 0)
        {
          fromIndex = Math.max(0, arr.length + fromIndex);
        }

        if (Bu.isString(arr))
        {
          // Array.prototype.lastIndexOf uses === so only strings should be found.
          if (!Bu.isString(obj) || obj.length !== 1)
          {
            return -1;
          }
          return arr.lastIndexOf(obj, fromIndex);
        }

        for (let i = fromIndex; i >= 0; i--)
        {
          if (i in arr && arr[i] === obj) return i;
        }
        return -1;
      }
      else
      {
        // goog.asserts.assert(arr.length != null);

        // Firefox treats undefined and null as 0 in the fromIndex argument which
        // leads it to always return -1
        fromIndex = opt_fromIndex == null ? arr.length - 1 : opt_fromIndex;
        return Array.prototype.lastIndexOf.call(arr, obj, fromIndex);
      }
    };

    /**
     * Calls a function for each element in an array, and if the function returns
     * true adds the element to a new array.
     *
     * See {@link http://tinyurl.com/developer-mozilla-org-array-filter}
     *
     * @param {Array<T>|string} arr Array or array
     *     like object over which to iterate.
     * @param {?function(this:S, T, number, ?):boolean} fn The function to call for
     *     every element. This function
     *     takes 3 arguments (the element, the index and the array) and must
     *     return a Boolean. If the return value is true the element is added to the
     *     result array. If it is false the element is not included.
     * @param {S=} opt_obj The object to be used as the value of 'this'
     *     within fn.
     * @return {!Array<T>} a new array in which only elements that passed the test
     *     are present.
     * @template T,S
     */
    _Array.filter = function (arr, fn, opt_obj)
    {
      if (!Array.prototype.filter)
      {
        let l = arr.length;  // must be fixed during loop... see docs
        let res = [];
        let resLength = 0;
        let arr2 = Bu.isString(arr) ? arr.split('') : arr;
        for (let i = 0; i < l; i++)
        {
          if (i in arr2)
          {
            let val = arr2[i];  // in case fn mutates arr2
            if (fn.call(/** @type {?} */ (opt_obj), val, i, arr))
            {
              res[resLength++] = val;
            }
          }
        }
        return res;
      }
      else
      {

        // goog.asserts.assert(arr.length != null);

        return Array.prototype.filter.call(arr, fn, opt_obj);

      }
    };

    /**
     * Passes every element of an array into a function and accumulates the result.
     *
     * See {@link http://tinyurl.com/developer-mozilla-org-array-reduce}
     *
     * For example:
     * let a = [1, 2, 3, 4];
     * reduce(a, function(r, v, i, arr) {return r + v;}, 0);
     * returns 10
     *
     * @param {Array<T>|string} arr Array or array
     *     like object over which to iterate.
     * @param {function(this:S, R, T, number, ?) : R} fn The function to call for
     *     every element. This function
     *     takes 4 arguments (the function's previous result or the initial value,
     *     the value of the current array element, the current array index, and the
     *     array itself)
     *     function(previousValue, currentValue, index, array).
     * @param {?} val The initial value to pass into the function on the first call.
     * @param {S=} opt_obj  The object to be used as the value of 'this'
     *     within fn.
     * @return {R} Result of evaluating fn repeatedly across the values of the array.
     * @template T,S,R
     */
    _Array.reduce = function (arr, fn, val, opt_obj)
    {
      if (!Array.prototype.reduce)
      {
        let rval = val;
        this.forEach(arr, function (val, index)
        {
          rval = fn.call(/** @type {?} */ (opt_obj), rval, val, index, arr);
        });
        return rval;
      }
      else
      {
        // goog.asserts.assert(arr.length != null);
        if (opt_obj)
        {
          fn =Bu.bind(fn, opt_obj);
        }
        return Array.prototype.reduce.call(arr, fn, val);
      }
    };

    /**
     * Passes every element of an array into a function and accumulates the result,
     * starting from the last element and working towards the first.
     *
     * See {@link http://tinyurl.com/developer-mozilla-org-array-reduceright}
     *
     * For example:
     * let a = ['a', 'b', 'c'];
     * reduceRight(a, function(r, v, i, arr) {return r + v;}, '');
     * returns 'cba'
     *
     * @param {Array<T>|string} arr Array or array
     *     like object over which to iterate.
     * @param {?function(this:S, R, T, number, ?) : R} f The function to call for
     *     every element. This function
     *     takes 4 arguments (the function's previous result or the initial value,
     *     the value of the current array element, the current array index, and the
     *     array itself)
     *     function(previousValue, currentValue, index, array).
     * @param {?} val The initial value to pass into the function on the first call.
     * @param {S=} opt_obj The object to be used as the value of 'this'
     *     within f.
     * @return {R} Object returned as a result of evaluating f repeatedly across the
     *     values of the array.
     * @template T,S,R
     */
    _Array.reduceRight = function (arr, f, val, opt_obj)
    {
      if (!Array.prototype.reduceRight)
      {
        let rval = val;
        this.forEachRight(arr, function (val, index)
        {
          rval = f.call(/** @type {?} */ (opt_obj), rval, val, index, arr);
        });
        return rval;
      }
      else
      {
        // goog.asserts.assert(arr.length != null);
        // goog.asserts.assert(f != null);
        if (opt_obj)
        {
          f = Bu.bind(f, opt_obj);
        }
        return Array.prototype.reduceRight.call(arr, f, val);

      }
    };

    /**
     * Call f for each element of an array. If all calls return true, every()
     * returns true. If any call returns false, every() returns false and
     * does not continue to check the remaining elements.
     *
     * See {@link http://tinyurl.com/developer-mozilla-org-array-every}
     *
     * @param {Array<T>|string} arr Array or array
     *     like object over which to iterate.
     * @param {?function(this:S, T, number, ?) : boolean} f The function to call for
     *     for every element. This function takes 3 arguments (the element, the
     *     index and the array) and should return a boolean.
     * @param {S=} opt_obj The object to be used as the value of 'this'
     *     within f.
     * @return {boolean} false if any element fails the test.
     * @template T,S
     */
    _Array.every = function (arr, f, opt_obj)
    {
      if (!Array.prototype.every)
      {
        let l = arr.length;  // must be fixed during loop... see docs
        let arr2 = Bu.isString(arr) ? arr.split('') : arr;
        for (let i = 0; i < l; i++)
        {
          if (i in arr2 && !f.call(/** @type {?} */ (opt_obj), arr2[i], i, arr))
          {

            return false;
          }
        }
        return true;
      }
      else
      {
        // goog.asserts.assert(arr.length != null);
        return Array.prototype.every.call(arr, f, opt_obj);
      }
    };

    /**
     * Counts the array elements that fulfill the predicate, i.e. for which the
     * callback function returns true. Skips holes in the array.
     *
     * @param {!Array<T>|string} arr Array or array like object
     *     over which to iterate.
     * @param {function(this: S, T, number, ?): boolean} f The function to call for
     *     every element. Takes 3 arguments (the element, the index and the array).
     * @param {S=} opt_obj The object to be used as the value of 'this' within f.
     * @return {number} The number of the matching elements.
     * @template T,S
     */
    _Array.count = function (arr, f, opt_obj)
    {
      let count = 0;
      this.forEach(arr, function (element, index, arr)
      {
        if (f.call(/** @type {?} */ (opt_obj), element, index, arr))
        {
          ++count;
        }
      }, opt_obj);
      return count;
    };

    /**
     * Search an array for the first element that satisfies a given condition and
     * return that element.
     * @param {Array<T>|string} arr Array or array
     *     like object over which to iterate.
     * @param {?function(this:S, T, number, ?) : boolean} f The function to call
     *     for every element. This function takes 3 arguments (the element, the
     *     index and the array) and should return a boolean.
     * @param {S=} opt_obj An optional "this" context for the function.
     * @return {T|null} The first array element that passes the test, or null if no
     *     element is found.
     * @template T,S
     */
    _Array.find = function (arr, f, opt_obj)
    {
      let i = this.findIndex(arr, f, opt_obj);
      return i < 0 ? null : Bu.isString(arr) ? arr.charAt(i) : arr[i];
    };

    /**
     * Search an array for the first element that satisfies a given condition and
     * return its index.
     * @param {Array<T>|string} arr Array or array
     *     like object over which to iterate.
     * @param {?function(this:S, T, number, ?) : boolean} f The function to call for
     *     every element. This function
     *     takes 3 arguments (the element, the index and the array) and should
     *     return a boolean.
     * @param {S=} opt_obj An optional "this" context for the function.
     * @return {number} The index of the first array element that passes the test,
     *     or -1 if no element is found.
     * @template T,S
     */
    _Array.findIndex = function (arr, f, opt_obj)
    {
      let l = arr.length;  // must be fixed during loop... see docs
      let arr2 = Bu.isString(arr) ? arr.split('') : arr;
      for (let i = 0; i < l; i++)
      {
        if (i in arr2 && f.call(/** @type {?} */ (opt_obj), arr2[i], i, arr))
        {
          return i;
        }
      }
      return -1;
    };

    /**
     * Search an array (in reverse order) for the last element that satisfies a
     * given condition and return that element.
     * @param {Array<T>|string} arr Array or array
     *     like object over which to iterate.
     * @param {?function(this:S, T, number, ?) : boolean} f The function to call
     *     for every element. This function
     *     takes 3 arguments (the element, the index and the array) and should
     *     return a boolean.
     * @param {S=} opt_obj An optional "this" context for the function.
     * @return {T|null} The last array element that passes the test, or null if no
     *     element is found.
     * @template T,S
     */
    _Array.findRight = function (arr, f, opt_obj)
    {
      let i = this.findIndexRight(arr, f, opt_obj);
      return i < 0 ? null : Bu.isString(arr) ? arr.charAt(i) : arr[i];
    };

    /**
     * Search an array (in reverse order) for the last element that satisfies a
     * given condition and return its index.
     * @param {Array<T>|string} arr Array or array
     *     like object over which to iterate.
     * @param {?function(this:S, T, number, ?) : boolean} f The function to call
     *     for every element. This function
     *     takes 3 arguments (the element, the index and the array) and should
     *     return a boolean.
     * @param {S=} opt_obj An optional "this" context for the function.
     * @return {number} The index of the last array element that passes the test,
     *     or -1 if no element is found.
     * @template T,S
     */
    _Array.findIndexRight = function (arr, f, opt_obj)
    {
      let l = arr.length;  // must be fixed during loop... see docs
      let arr2 = Bu.isString(arr) ? arr.split('') : arr;
      for (let i = l - 1; i >= 0; i--)
      {
        if (i in arr2 && f.call(/** @type {?} */ (opt_obj), arr2[i], i, arr))
        {
          return i;
        }
      }
      return -1;
    };

    /**
     * Whether the array contains the given object.
     * @param {Array<?>|string} arr The array to test for the presence of the
     *     element.
     * @param {*} obj The object for which to test.
     * @return {boolean} true if obj is present.
     */
    _Array.contains = function (arr, obj)
    {
      return this.indexOf(arr, obj) >= 0;
    };

    /**
     * Whether the array is empty.
     * @param {Array<?>|string} arr The array to test.
     * @return {boolean} true if empty.
     */
    _Array.isEmpty = function (arr)
    {
      return arr.length === 0;
    };

    /**
     * Clears the array.
     * @param {Array<?>} arr Array or array like object to clear.
     */
    _Array.clear = function (arr)
    {
      // For non real arrays we don't have the magic length so we delete the
      // indices.
      if (!Bu.isArray(arr))
      {
        arr = [];
        //for (let i = arr.length - 1; i >= 0; i--)
        //{
        //msg this sets the values as each element of the array to (empty|undefined|null)
        //rather set the value of the array to an empty array
        //delete arr[i];
        //}
      }
      arr.length = 0;
    };

    _Array.removeAll = _Array.clear;

    /**
     * Pushes an item into an array, if it's not already in the array.
     * @param {Array<T>} arr Array into which to insert the item.
     * @param {T} obj Value to add.
     * @template T
     */
    _Array.insert = function (arr, obj)
    {
      if (!this.contains(arr, obj))
      {
        arr.push(obj);
      }
    };

    /**
     * Inserts an object at the given index of the array.
     * @param {Array<?>} arr The array to modify.
     * @param {*} obj The object to insert.
     * @param {number=} opt_i The index at which to insert the object. If omitted,
     *      treated as 0. A negative index is counted from the end of the array.
     */
    _Array.insertAt = function (arr, obj, opt_i)
    {
      this.splice(arr, opt_i, 0, obj);
    };

    /**
     * Inserts at the given index of the array, all elements of another array.
     * @param {Array<?>} arr The array to modify.
     * @param {Array<?>} elementsToAdd The array of elements to add.
     * @param {number=} opt_i The index at which to insert the object. If omitted,
     *      treated as 0. A negative index is counted from the end of the array.
     */
    _Array.insertArrayAt = function (arr, elementsToAdd, opt_i)
    {
      Bu.partial(this.splice, arr, opt_i, 0).apply(null, elementsToAdd);
    };

    /**
     * Inserts an object into an array before a specified object.
     * @param {Array<T>} arr The array to modify.
     * @param {T} obj The object to insert.
     * @param {T=} opt_obj2 The object before which obj should be inserted. If obj2
     *     is omitted or not found, obj is inserted at the end of the array.
     * @template T
     */
    _Array.insertBefore = function (arr, obj, opt_obj2)
    {
      let i;

      if (arguments.length === 2 || (i = this.indexOf(arr, opt_obj2)) < 0)
      {
        arr.push(obj);
      }
      else
      {
        this.insertAt(arr, obj, i);
      }
    };

    /**
     * Removes the last element from an array if no index param is supplied
     * but removes the element at a specified index in the array
     * and returns the deleted element
     * Designed to behave like pop in python
     * @param arr {Array<T>} arr Array from which to remove
     * @param index {Number}
     * @returns {*}
     */
    _Array.pop = function (arr, index = null)
    {
      if(!index)
      {
        return arr.pop();
      }
      else if(arr && Bu.isNumber(index))
      {
        return this.removeAt(arr, index);
      }
    };

    /**
     * Removes the first occurrence of a particular value from an array.
     * @param {Array<T>} arr Array from which to remove
     *     value.
     * @param {T} obj Object to remove.
     * @return {boolean} True if an element was removed.
     * @template T
     */
    _Array.remove = function (arr, obj)
    {
      let i = this.indexOf(arr, obj);
      let rv;

      if ((rv = i >= 0))
      {
        this.removeAt(arr, i);
      }

      return rv;
    };

    /**
     * Removes the last occurrence of a particular value from an array.
     * @param {!Array<T>} arr Array from which to remove value.
     * @param {T} obj Object to remove.
     * @return {boolean} True if an element was removed.
     * @template T
     */
    _Array.removeLast = function (arr, obj)
    {
      let i = this.lastIndexOf(arr, obj);

      if (i >= 0)
      {
        this.removeAt(arr, i);
        return true;
      }

      return false;
    };

    /**
     * Removes from an array the element at index index
     * @param {Array<?>} arr Array or array like object from which to
     *     remove value.
     * @param {number} index The index to remove.
     * @return {boolean} True if an element was removed.
     */
    _Array.removeAt = function (arr, index)
    {
      // goog.asserts.assert(arr.length != null);

      // use generic form of splice
      // splice returns the removed items and if successful the length of that
      // will be 1
      return Array.prototype.splice.call(arr, index, 1).length === 1;
    };

    /**
     * Removes the first value that satisfies the given condition.
     * @param {Array<T>} arr Array or array
     *     like object over which to iterate.
     * @param {?function(this:S, T, number, ?) : boolean} f The function to call
     *     for every element. This function
     *     takes 3 arguments (the element, the index and the array) and should
     *     return a boolean.
     * @param {S=} opt_obj An optional "this" context for the function.
     * @return {boolean} True if an element was removed.
     * @template T,S
     */
    _Array.removeIf = function (arr, f, opt_obj)
    {
      let i = this.findIndex(arr, f, opt_obj);
      if (i >= 0)
      {
        this.removeAt(arr, i);
        return true;
      }
      return false;
    };

    /**
     * Removes all values that satisfy the given condition.
     * @param {Array<T>} arr Array or array
     *     like object over which to iterate.
     * @param {?function(this:S, T, number, ?) : boolean} f The function to call
     *     for every element. This function
     *     takes 3 arguments (the element, the index and the array) and should
     *     return a boolean.
     * @param {S=} opt_obj An optional "this" context for the function.
     * @return {number} The number of items removed
     * @template T,S
     */
    _Array.removeAllIf = function (arr, f, opt_obj)
    {
      let removedCount = 0;

      this.forEachRight(arr, function (val, index)
      {
        if (f.call(/** @type {?} */ (opt_obj), val, index, arr))
        {
          if (this.removeAt(arr, index))
          {
            removedCount++;
          }
        }
      });

      return removedCount;
    };

    /**
     * Returns a new array that is the result of joining the arguments.  If arrays
     * are passed then their items are added, however, if non-arrays are passed they
     * will be added to the return array as is.
     *
     * Note that ArrayLike objects will be added as is, rather than having their
     * items added.
     *
     * concat([1, 2], [3, 4]) -> [1, 2, 3, 4]
     * concat(0, [1, 2]) -> [0, 1, 2]
     * concat([1, 2], null) -> [1, 2, null]
     *
     * There is bug in all current versions of IE (6, 7 and 8) where arrays created
     * in an iframe become corrupted soon (not immediately) after the iframe is
     * destroyed. This is common if loading data via goog.net.IframeIo, for example.
     * This corruption only affects the concat method which will start throwing
     * Catastrophic Errors (#-2147418113).
     *
     * See http://endoflow.com/scratch/corrupted-arrays.html for a test case.
     *
     * Internally this should use this, so that all methods will continue to
     * work on these broken array objects.
     *
     * @param {...*} var_args Items to concatenate.  Arrays will have each item
     *     added, while primitives and objects will be added as is.
     * @return {!Array<?>} The new resultant array.
     */
    _Array.concat = function (var_args)
    {
      return Array.prototype.concat.apply(Array.prototype, arguments);
    };

    /**
     * Returns a new array that contains the contents of all the arrays passed.
     * @param {...!Array<T>} var_args
     * @return {!Array<T>}
     * @template T
     */
    _Array.join = function (var_args)
    {
      return Array.prototype.concat.apply(Array.prototype, arguments);
    };

    /**
     *
     * @param arr {Array}
     * @param start {Number}
     * @param {Number} [opt_end]
     * @returns {T[]}
     */
    _Array.slice        = function (arr, start, opt_end)
    {
      // passing 1 arg to slice is not the same as passing 2 where the second is
      // null or undefined (in that case the second argument is treated as 0).
      // we could use slice on the arguments object and then use apply instead of
      // testing the length
      if (arguments.length <= 2)
      {
        return Array.prototype.slice.call(arr, start);
      }
      else
      {
        return Array.prototype.slice.call(arr, start, opt_end);
      }

    };

    /**
     *
     * @param arr {Array}
     * @param index {Number}
     * @param howMany {Number}
     * @param var_args
     * @returns {T[]}
     */
    _Array.splice       = function (arr, index, howMany, var_args)
    {
      return Array.prototype.splice.apply(arr, _Array.slice(arguments, 1));
    };

    /**
     * Searches the specified array for the specified target using the binary
     * search algorithm.  If no opt_compareFn is specified, elements are compared
     * using {@code Bee.Array.defaultCompare}, which compares the elements
     * using the built in < and > operators.  This will produce the expected
     * behavior for homogeneous arrays of String(s) and Number(s). The array
     * specified <b>must</b> be sorted in ascending order (as defined by the
     * comparison function).  If the array is not sorted, results are undefined.
     * If the array contains multiple instances of the specified target value, any
     * of these instances may be found.
     *
     * Runtime: O(log n)
     *
     * @param {ArrayLike<VALUE>} arr The array to be searched.
     * @param {TARGET} target The sought value.
     * @param {function(TARGET, VALUE): number=} opt_compareFn Optional comparison
     *     function by which the array is ordered. Should take 2 arguments to
     *     compare, and return a negative number, zero, or a positive number
     *     depending on whether the first argument is less than, equal to, or
     *     greater than the second.
     * @return {number} Lowest index of the target value if found, otherwise
     *     (-(insertion point) - 1). The insertion point is where the value should
     *     be inserted into arr to preserve the sorted property.  Return value >= 0
     *     iff target is found.
     * @template TARGET, VALUE
     */
    _Array.binarySearch = function (arr, target, opt_compareFn)
    {
      return this.binarySearch_(
        arr, opt_compareFn || this.defaultCompare, false /* isEvaluator */,
        target);
    };

    /**
     * casts a list or Array-Like object to an Array
     * @param list {Collection | String}
     * @returns {Array}
     */
    _Array.toArray          = function (list)
    {
      if (Bu.defined(list))
      {
        let newArray = [];
        if(Bu.isString(list))
        {
          list = list.split('')
        }

        if(list.length < 1 || !Bu.defined(list.length))
        {
          return this.asArray(list);
        }
        for (let i = 0, len = list.length; i < len; i++)
        {
          newArray.push(list[i]);
        }
        return newArray
      }
      else
      {
        throw new Error("Bee.Array.toArray method expects a list")
      }
    };

    /**
     * @use Wraps a variable as an array, if it isn't one yet.
     * @use Note that an input array is returned by reference!
     * @param a {Array}
     * @returns {*|Array}
     */
    _Array.asArray     = function (a)
    {
      return Bu.isArray(a) ? a : [a];
    };

    /**
     *
     * @param {any} obj
     * @param {Array<T>} arr
     * @returns {boolean}
     */
    _Array.inArray = function (obj, arr)
    {
      return arr.indexOf(obj) > -1;
    };

    /**
     * Non-recursive method to find the lowest member of an array. Math.min raises a maximum
     * call stack size exceeded error in Chrome when trying to apply more than 150.000 points. This
     * method is slightly slower, but safe.
     * @param data
     * @returns {*}
     */
    _Array.min = function (data)
    {
      let i   = data.length,
          min = data[0];

      while (i--)
      {
        if (data[i] < min)
        {
          min = data[i];
        }
      }
      return min;
    };

    /**
     * Non-recursive method to find the lowest member of an array. Math.min raises a maximum
     * call stack size exceeded error in Chrome when trying to apply more than 150.000 points. This
     * method is slightly slower, but safe.
     *
     * @param data
     * @returns {*}
     */
    _Array.max = function (data)
    {
      let i   = data.length,
          max = data[0];

      while (i--)
      {
        if (data[i] > max)
        {
          max = data[i];
        }
      }
      return max;
    };

    _Array.ShardToNestedArrays = function(array, numberOfElsPerNestedArray)
    {
      let result = [];
      while (!_Array.isEmpty(array))
      {  let shard = [];
        for (let i = 0; i < numberOfElsPerNestedArray; i++)
        {
          shard.push(array.pop());
        }
        result.push(shard);
      }
      return result;
    };

module.exports = _Array;


