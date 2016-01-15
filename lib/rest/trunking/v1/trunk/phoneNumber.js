'use strict';

var _ = require('lodash');
var InstanceContext = require('../../../../base/InstanceContext');
var InstanceResource = require('../../../../base/InstanceResource');
var ListResource = require('../../../../base/ListResource');
var values = require('../../../../base/values');

var PhoneNumberList;
var PhoneNumberInstance;
var PhoneNumberContext;

/**
 * Initialize the PhoneNumberList
 *
 * :param Version version: Version that contains the resource
 * :param trunkSid: The trunk_sid
 *
 * @returns PhoneNumberList
 */
function PhoneNumberList(version, trunkSid) {
  function PhoneNumberListInstance(sid) {
    return PhoneNumberListInstance.get(sid);
  }

  PhoneNumberListInstance._version = version;
  // Path Solution
  PhoneNumberListInstance._solution = {
    trunkSid: trunkSid
  };
  PhoneNumberListInstance._uri = _.template(
    '/Trunks/{trunk_sid}/PhoneNumbers' // jshint ignore:line
  )(PhoneNumberListInstance._solution);
  /**
   * Create a new PhoneNumberInstance
   *
   * @param string phoneNumberSid - The phone_number_sid
   *
   * @returns Newly created PhoneNumberInstance
   */
  PhoneNumberListInstance.create = function create(phoneNumberSid) {
    var data = values.of({
      'Phonenumbersid': phoneNumberSid
    });

    var payload = this._version.create({
      uri: this._uri,
      method: 'POST',
      data: data,
    });

    return new PhoneNumberInstance(
      this._version,
      payload,
      this._solution.trunkSid
    );
  };

  /**
   * Streams PhoneNumberInstance records from the API.
   * This operation lazily loads records as efficiently as possible until the limit
   * is reached.
   * The results are passed into the callback function, so this operation is memory efficient.
   *
   * @param {number} [opts.limit] -
   *         Upper limit for the number of records to return.
   *         list() guarantees never to return more than limit.
   *         Default is no limit
   * @param {number} [opts.pageSize=50] -
   *         Number of records to fetch per request,
   *         when not set will use the default value of 50 records.
   *         If no pageSize is defined but a limit is defined,
   *         list() will attempt to read the limit with the most efficient
   *         page size, i.e. min(limit, 1000)
   * @param {Function} opts.callback - A callback function to process records
   */
  PhoneNumberListInstance.stream = function stream() {
    var limits = this._version.readLimits({
      limit: opts.limit,
      pageSize: opts.pageSize
    });

    var page = this.page();

    return this._version.stream(page, limits.limit, limits.pageLimit);
  };

  /**
   * Lists PhoneNumberInstance records from the API as a list.
   *
   * @param {number} [opts.limit] -
   *         Upper limit for the number of records to return.
   *         list() guarantees never to return more than limit.
   *         Default is no limit
   * @param {number} [opts.pageSize] -
   *         Number of records to fetch per request,
   *         when not set will use the default value of 50 records.
   *         If no page_size is defined but a limit is defined,
   *         list() will attempt to read the limit with the most
   *         efficient page size, i.e. min(limit, 1000)
   *
   * @returns {Array} A list of records
   */
  PhoneNumberListInstance.list = function list() {
    var limits = this._version.readLimits({
      limit: opts.limit,
      pageSize: opts.pageSize,
    });

    return this.page(
      limits.pageSize
    );
  };

  /**
   * Retrieve a single page of PhoneNumberInstance records from the API.
   * Request is executed immediately
   *
   * @param {string} [opts.pageToken] - PageToken provided by the API
   * @param {number} [opts.pageNumber] -
   *          Page Number, this value is simply for client state
   * @param {number} [opts.pageSize] - Number of records to return, defaults to 50
   *
   * @returns Page of PhoneNumberInstance
   */
  PhoneNumberListInstance.page = function page() {
    var params = values.of({
      'PageToken': page_token,
      'Page': page_number,
      'PageSize': page_size
    });

    var response = this._version.page(
      'GET',
      self._uri,
      params
    );

    return PhoneNumberPage(
      this._version,
      response,
      this._solution.trunkSid
    );
  };

  /**
   * Constructs a PhoneNumberContext
   *
   * :param sid - The sid
   *
   * @returns PhoneNumberContext
   */
  PhoneNumberListInstance.get = function get(sid) {
    return new PhoneNumberContext(
      this._version,
      this._solution.trunkSid,
      sid
    );
  };

  return PhoneNumberListInstance;
}


/**
 * Initialize the PhoneNumberContext
 *
 * @param {Version} version - Version that contains the resource
 * @param {object} payload - The instance payload
 * @param {sid} trunkSid: The trunk_sid
 * @param {sid} sid: The sid
 *
 * @returns {PhoneNumberContext}
 */
function PhoneNumberInstance(version, payload, trunkSid, sid) {
  InstanceResource.prototype.constructor.call(this, version);

  // Marshaled Properties
  this._properties = {
    accountSid: payload.account_sid, // jshint ignore:line,
    addressRequirements: payload.address_requirements, // jshint ignore:line,
    apiVersion: payload.api_version, // jshint ignore:line,
    beta: payload.beta, // jshint ignore:line,
    capabilities: payload.capabilities, // jshint ignore:line,
    dateCreated: payload.date_created, // jshint ignore:line,
    dateUpdated: payload.date_updated, // jshint ignore:line,
    friendlyName: payload.friendly_name, // jshint ignore:line,
    links: payload.links, // jshint ignore:line,
    phoneNumber: payload.phone_number, // jshint ignore:line,
    sid: payload.sid, // jshint ignore:line,
    smsApplicationSid: payload.sms_application_sid, // jshint ignore:line,
    smsFallbackMethod: payload.sms_fallback_method, // jshint ignore:line,
    smsFallbackUrl: payload.sms_fallback_url, // jshint ignore:line,
    smsMethod: payload.sms_method, // jshint ignore:line,
    smsUrl: payload.sms_url, // jshint ignore:line,
    statusCallback: payload.status_callback, // jshint ignore:line,
    statusCallbackMethod: payload.status_callback_method, // jshint ignore:line,
    trunkSid: payload.trunk_sid, // jshint ignore:line,
    url: payload.url, // jshint ignore:line,
    voiceApplicationSid: payload.voice_application_sid, // jshint ignore:line,
    voiceCallerIdLookup: payload.voice_caller_id_lookup, // jshint ignore:line,
    voiceFallbackMethod: payload.voice_fallback_method, // jshint ignore:line,
    voiceFallbackUrl: payload.voice_fallback_url, // jshint ignore:line,
    voiceMethod: payload.voice_method, // jshint ignore:line,
    voiceUrl: payload.voice_url, // jshint ignore:line,
  };

  // Context
  this._context = undefined;
  this._solution = {
    trunkSid: trunkSid,
    sid: sid || this._properties.sid,
  };
}

_.extend(PhoneNumberInstance.prototype, InstanceResource.prototype);
PhoneNumberInstance.prototype.constructor = PhoneNumberInstance;

Object.defineProperty(PhoneNumberInstance.prototype,
  '_proxy', {
  get: function() {
    if (!this._context) {
      this._context = new PhoneNumberContext(
        this._version,
        this._solution.trunkSid,
        this._solution.sid
      );
    }

    return this._context;
  },
});

Object.defineProperty(PhoneNumberInstance.prototype,
  'accountSid', {
  get: function() {
    return this._properties.accountSid;
  },
});

Object.defineProperty(PhoneNumberInstance.prototype,
  'addressRequirements', {
  get: function() {
    return this._properties.addressRequirements;
  },
});

Object.defineProperty(PhoneNumberInstance.prototype,
  'apiVersion', {
  get: function() {
    return this._properties.apiVersion;
  },
});

Object.defineProperty(PhoneNumberInstance.prototype,
  'beta', {
  get: function() {
    return this._properties.beta;
  },
});

Object.defineProperty(PhoneNumberInstance.prototype,
  'capabilities', {
  get: function() {
    return this._properties.capabilities;
  },
});

Object.defineProperty(PhoneNumberInstance.prototype,
  'dateCreated', {
  get: function() {
    return this._properties.dateCreated;
  },
});

Object.defineProperty(PhoneNumberInstance.prototype,
  'dateUpdated', {
  get: function() {
    return this._properties.dateUpdated;
  },
});

Object.defineProperty(PhoneNumberInstance.prototype,
  'friendlyName', {
  get: function() {
    return this._properties.friendlyName;
  },
});

Object.defineProperty(PhoneNumberInstance.prototype,
  'links', {
  get: function() {
    return this._properties.links;
  },
});

Object.defineProperty(PhoneNumberInstance.prototype,
  'phoneNumber', {
  get: function() {
    return this._properties.phoneNumber;
  },
});

Object.defineProperty(PhoneNumberInstance.prototype,
  'sid', {
  get: function() {
    return this._properties.sid;
  },
});

Object.defineProperty(PhoneNumberInstance.prototype,
  'smsApplicationSid', {
  get: function() {
    return this._properties.smsApplicationSid;
  },
});

Object.defineProperty(PhoneNumberInstance.prototype,
  'smsFallbackMethod', {
  get: function() {
    return this._properties.smsFallbackMethod;
  },
});

Object.defineProperty(PhoneNumberInstance.prototype,
  'smsFallbackUrl', {
  get: function() {
    return this._properties.smsFallbackUrl;
  },
});

Object.defineProperty(PhoneNumberInstance.prototype,
  'smsMethod', {
  get: function() {
    return this._properties.smsMethod;
  },
});

Object.defineProperty(PhoneNumberInstance.prototype,
  'smsUrl', {
  get: function() {
    return this._properties.smsUrl;
  },
});

Object.defineProperty(PhoneNumberInstance.prototype,
  'statusCallback', {
  get: function() {
    return this._properties.statusCallback;
  },
});

Object.defineProperty(PhoneNumberInstance.prototype,
  'statusCallbackMethod', {
  get: function() {
    return this._properties.statusCallbackMethod;
  },
});

Object.defineProperty(PhoneNumberInstance.prototype,
  'trunkSid', {
  get: function() {
    return this._properties.trunkSid;
  },
});

Object.defineProperty(PhoneNumberInstance.prototype,
  'url', {
  get: function() {
    return this._properties.url;
  },
});

Object.defineProperty(PhoneNumberInstance.prototype,
  'voiceApplicationSid', {
  get: function() {
    return this._properties.voiceApplicationSid;
  },
});

Object.defineProperty(PhoneNumberInstance.prototype,
  'voiceCallerIdLookup', {
  get: function() {
    return this._properties.voiceCallerIdLookup;
  },
});

Object.defineProperty(PhoneNumberInstance.prototype,
  'voiceFallbackMethod', {
  get: function() {
    return this._properties.voiceFallbackMethod;
  },
});

Object.defineProperty(PhoneNumberInstance.prototype,
  'voiceFallbackUrl', {
  get: function() {
    return this._properties.voiceFallbackUrl;
  },
});

Object.defineProperty(PhoneNumberInstance.prototype,
  'voiceMethod', {
  get: function() {
    return this._properties.voiceMethod;
  },
});

Object.defineProperty(PhoneNumberInstance.prototype,
  'voiceUrl', {
  get: function() {
    return this._properties.voiceUrl;
  },
});

/**
 * Fetch a PhoneNumberInstance
 *
 * @returns Fetched PhoneNumberInstance
 */
PhoneNumberInstance.prototype.fetch = function fetch() {
  return this._proxy.fetch();
};

/**
 * Deletes the PhoneNumberInstance
 *
 * @returns true if delete succeeds, false otherwise
 */
PhoneNumberInstance.prototype.remove = function remove() {
  return this._proxy.remove();
};


/**
 * Initialize the PhoneNumberContext
 *
 * @param {Version} version - Version that contains the resource
 * @param {sid} trunkSid - The trunk_sid
 * @param {sid} sid - The sid
 *
 * @returns {PhoneNumberContext}
 */
function PhoneNumberContext(version, trunkSid, sid) {
  InstanceContext.prototype.constructor.call(this, version);

  // Path Solution
  this._solution = {
    trunkSid: trunkSid,
    sid: sid,
  };
  this._uri = _.template(
    '/Trunks/<% trunk_sid %>/PhoneNumbers/<% sid %>' // jshint ignore:line
  )(this._solution);
}

_.extend(PhoneNumberContext.prototype, InstanceContext.prototype);
PhoneNumberContext.prototype.constructor = PhoneNumberContext;

/**
 * Fetch a PhoneNumberInstance
 *
 * @returns Fetched PhoneNumberInstance
 */
PhoneNumberContext.prototype.fetch = function fetch() {
  var params = values.of({});

  var promise = this._version.fetch({
    method: 'GET',
    uri: this._uri,
    params: params,
  });

  promise = promise.then(function(payload) {
    return new PhoneNumberInstance(
      this._version,
      payload,
      this._solution.trunkSid,
      this._solution.sid
    );
  });

  return promise;
};

/**
 * Deletes the PhoneNumberInstance
 *
 * @returns true if delete succeeds, false otherwise
 */
PhoneNumberContext.prototype.remove = function remove() {
  return this._version.remove(this._uri);
};

module.exports = {
  PhoneNumberList: PhoneNumberList,
  PhoneNumberInstance: PhoneNumberInstance,
  PhoneNumberContext: PhoneNumberContext
};