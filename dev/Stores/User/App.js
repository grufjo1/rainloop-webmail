
import ko from 'ko';
import {Focused, KeyState} from 'Common/Enums';
import {keyScope} from 'Common/Globals';
import {isNonEmptyArray} from 'Common/Utils';

import * as Settings from 'Storage/Settings';

import {AbstractAppStore} from 'Stores/AbstractApp';

class AppUserStore extends AbstractAppStore
{
	constructor() {
		super();

		this.currentAudio = ko.observable('');

		this.focusedState = ko.observable(Focused.None);

		this.focusedState.subscribe((value) => {
			switch (value)
			{
				case Focused.MessageList:
					keyScope(KeyState.MessageList);
					break;
				case Focused.MessageView:
					keyScope(KeyState.MessageView);
					break;
				case Focused.FolderList:
					keyScope(KeyState.FolderList);
					break;
				default:
					break;
			}
		});

		this.projectHash = ko.observable('');
		this.threadsAllowed = ko.observable(false);

		this.composeInEdit = ko.observable(false);

		this.contactsAutosave = ko.observable(false);
		this.useLocalProxyForExternalImages = ko.observable(false);

		this.contactsIsAllowed = ko.observable(false);

		this.attachmentsActions = ko.observableArray([]);

		this.devEmail = '';
		this.devPassword = '';
	}

	populate() {

		super.populate();

		this.projectHash(Settings.settingsGet('ProjectHash'));

		this.contactsAutosave(!!Settings.settingsGet('ContactsAutosave'));
		this.useLocalProxyForExternalImages(!!Settings.settingsGet('UseLocalProxyForExternalImages'));

		this.contactsIsAllowed(!!Settings.settingsGet('ContactsIsAllowed'));

		const attachmentsActions = Settings.appSettingsGet('attachmentsActions');
		this.attachmentsActions(isNonEmptyArray(attachmentsActions) ? attachmentsActions : []);

		this.devEmail = Settings.settingsGet('DevEmail');
		this.devPassword = Settings.settingsGet('DevPassword');
	}
}

module.exports = new AppUserStore();
