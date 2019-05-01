/*These are helper, functions don't require until needed*/
let bcrypt = require('bcryptjs');
let Bee = require('../vendor/bumblebee/Bee');


module.exports = {
  /**
   *
   * @param str
   * @param callback
   * @returns Promise
   */
  hash : function (str, callback) {
    bcrypt.genSalt(10, function (err, salt)
    {
      bcrypt.hash(str, salt, callback);
    })
  },
  /**
   *
   * @param str {String}
   * @returns {boolean|String|*}
   */
  hashSync            : function (str)
  {

    let salt = bcrypt.genSaltSync(10);

    if (typeof str === 'string' && str.length > 0)
    {
      return bcrypt.hashSync(str, salt)
      //return bcrypt.hash(str, salt)
    }
    else
    {
      return false;
    }
  },
  compareHash : function(str, hashToCompareWith, callback){
    bcrypt.compare(str, hashToCompareWith, callback)
  },
  compareHashSync : function(str, hashToCompareWith){
    return bcrypt.compareSync(str, hashToCompareWith)
  },
  /**
   *
   * @param options {{[mimeTypes] : Array<String<'all'>>, optional : Boolean
   * destination : String<'uploads/'>, [filename] : function, [maxFileSize] : Number<5>}}
   * @returns {Multer}
   */
  upload          : function (options)
  {

    let defaultOptions = {
      mimeTypes : [],
      maxFileSize : 1024 *1024 * 5,
      optional : false,
      destination : 'uploads/',
      filename : function (req, file, callback) {

        if(options.optional && !file){
          callback(null, false);
        }
        else{
          callback(null, `${+new Date()}-${Bee.String.dasherise(file.originalname)}`)
        }
      }
    };

    const multer = require('multer');

    options = Bee.Object.extend(defaultOptions, options);
    defaultOptions = null; // we no longer need {@link defaultOptions}

    return multer({
      storage : multer.diskStorage({
                      destination : function (req, file, callback)
                      {
                        //we can do without the file
                        if(options.optional && !file){
                          callback(null, false);
                        }
                        else {
                          callback(null, options.destination) // let the default dir upload be the dir
                        }
                      },
                      filename    : options.filename
                    }),
      limits : { fileSize : options.maxFileSize },
      fileFilter : function (req, file, callback)
      {
        //we can do without the file
        if (options.optional && !file){
          callback(null, false);
        }
        else {
          if (options.mimeTypes.length === 0) //we're not filtering, we accept anything
          {
            callback(null, true);
          }
          else
          {
            if (options.mimeTypes.indexOf(file.mimetype) > 0)
            { // accept file
              callback(null, true);
            }
            else {
              // reject file
              callback(null, false);
            }
          }
        }

      }
    })
  }
};
