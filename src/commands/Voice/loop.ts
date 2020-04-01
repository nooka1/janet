import { Command, CommandStore, KlasaMessage } from 'klasa';
import JanetClient from '../../lib/client';
import Dispatcher from '../../util/dispatcher';

export default class extends Command {
    client: JanetClient;
    constructor(client: JanetClient, store: CommandStore, file: string[], dir: string) {
        super(client, store, file, dir, {
            enabled: true,
            runIn: ['text'],
            requiredPermissions: [],
            aliases: ['l'],
            cooldown: 5,
            description: (lang) => lang.get('LOOP_DESCRIPTION'),
        });
    }

    async run(msg: KlasaMessage) {
        const dispatcher = this.client.queue.get(msg.guild.id) as Dispatcher;
        if (!dispatcher) return msg.send('No music playing in here.');
        if (msg.member.voice.channel.id != dispatcher.player.voiceConnection.voiceChannelID) {
            return msg.send('We need to be in the same voice channel.');
        }
        dispatcher.loop = !dispatcher.loop;
        return msg.send(`Loop is: ${dispatcher.loop}`);
    }
}
