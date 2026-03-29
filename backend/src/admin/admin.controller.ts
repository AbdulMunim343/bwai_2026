import { Controller, Get, Post, Patch, Delete, Param, Query, Body, UseGuards, Req, Res } from '@nestjs/common';
import type { Response } from 'express';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { AdminService } from './admin.service';
import { WorkshopsService } from '../workshops/workshops.service';
import { RegistrationsService } from '../registrations/registrations.service';
import { ExceptionsService } from '../exceptions/exceptions.service';
import { CreateWorkshopDto } from '../workshops/dto/create-workshop.dto';
import { UpdateRegistrationStatusDto } from './dto/update-status.dto';

@Controller('admin')
@UseGuards(JwtAuthGuard)
export class AdminController {
  constructor(
    private adminService: AdminService,
    private workshopsService: WorkshopsService,
    private registrationsService: RegistrationsService,
    private exceptionsService: ExceptionsService,
  ) {}

  @Get('stats')
  getStats() {
    return this.adminService.getStats();
  }

  // Events CRUD
  @Get('events')
  getEvents(@Query('page') page?: string, @Query('limit') limit?: string) {
    return this.adminService.getEvents(
      page ? parseInt(page) : 1,
      limit ? parseInt(limit) : 100,
    );
  }

  @Post('events')
  createEvent(@Body() body: { name: string; type: string; description?: string; status?: string }) {
    return this.adminService.createEvent(body as any);
  }

  @Patch('events/:id')
  updateEvent(@Param('id') id: string, @Body() body: { name?: string; type?: string; description?: string; status?: string }) {
    return this.adminService.updateEvent(id, body as any);
  }

  @Delete('events/:id')
  deleteEvent(@Param('id') id: string) {
    return this.adminService.deleteEvent(id);
  }

  // Workshop CRUD
  @Get('workshops')
  getWorkshops(@Query('page') page?: string, @Query('limit') limit?: string) {
    if (page || limit) {
      return this.adminService.getWorkshopsPaginated(
        page ? parseInt(page) : 1,
        limit ? parseInt(limit) : 20,
      );
    }
    return this.workshopsService.findAll();
  }

  @Post('workshops')
  createWorkshop(@Body() dto: CreateWorkshopDto) {
    return this.workshopsService.create(dto);
  }

  @Patch('workshops/:id')
  updateWorkshop(@Param('id') id: string, @Body() dto: Partial<CreateWorkshopDto>) {
    return this.workshopsService.update(id, dto);
  }

  @Delete('workshops/:id')
  deleteWorkshop(@Param('id') id: string) {
    return this.workshopsService.remove(id);
  }

  // Registrations with search/filter/pagination
  @Get('registrations')
  getRegistrations(
    @Query('workshop_id') workshopId: string,
    @Query('name') name?: string,
    @Query('email') email?: string,
    @Query('phone') phone?: string,
    @Query('cnic') cnic?: string,
    @Query('status') status?: string,
    @Query('defines_you_best') definesYouBest?: string,
    @Query('gender') gender?: string,
    @Query('university_org') universityOrg?: string,
    @Query('checked_in') checkedIn?: string,
    @Query('page') page?: string,
    @Query('limit') limit?: string,
  ) {
    return this.adminService.getRegistrations(workshopId, {
      name,
      email,
      phone,
      cnic,
      status,
      defines_you_best: definesYouBest,
      gender,
      university_org: universityOrg,
      checked_in: checkedIn !== undefined && checkedIn !== '' ? checkedIn === 'true' : undefined,
      page: page ? parseInt(page) : 1,
      limit: limit ? parseInt(limit) : 20,
    });
  }

  @Get('registrations/export')
  async exportRegistrations(@Query('workshop_id') workshopId: string, @Res() res: Response) {
    const csv = await this.registrationsService.exportCsv(workshopId);
    res.setHeader('Content-Type', 'text/csv');
    res.setHeader('Content-Disposition', `attachment; filename=registrations-${workshopId}.csv`);
    res.send(csv);
  }

  // Status update — accepts one or more IDs.
  // Static route MUST be declared before the dynamic :id route in NestJS.
  @Patch('registrations/status')
  updateStatus(@Body() dto: UpdateRegistrationStatusDto) {
    return this.adminService.bulkUpdateStatus(dto.ids, dto.status);
  }

  // Single-ID shorthand (kept for backward compat with row-level actions)
  @Patch('registrations/:id/status')
  updateRegistrationStatus(
    @Param('id') id: string,
    @Body('status') status: string,
  ) {
    return this.adminService.updateRegistrationStatus(id, status);
  }

  // QR Scan
  @Post('qr-scan')
  scanQrCode(@Body('qr_data') qrData: string) {
    return this.adminService.scanQrCode(qrData);
  }

  @Patch('qr-scan/:id/attend')
  markAttendedFromScan(@Param('id') id: string) {
    return this.adminService.markAttendedFromScan(id);
  }

  // Exceptions
  @Get('exceptions')
  getExceptions() {
    return this.exceptionsService.findAll();
  }

  @Patch('exceptions/:id/approve')
  approveException(@Param('id') id: string, @Req() req: any) {
    return this.exceptionsService.approve(id, req.user.id);
  }

  @Patch('exceptions/:id/reject')
  rejectException(@Param('id') id: string, @Req() req: any) {
    return this.exceptionsService.reject(id, req.user.id);
  }

  // Check-in
  @Get('checkin/search')
  searchCheckin(@Query('workshop_id') workshopId: string, @Query('q') query: string) {
    return this.adminService.searchCheckin(workshopId, query);
  }

  @Patch('checkin/:id/toggle')
  toggleCheckin(@Param('id') id: string) {
    return this.adminService.toggleCheckin(id);
  }

  // Users (Admin) CRUD
  @Get('users')
  getUsers(@Query('page') page?: string, @Query('limit') limit?: string) {
    return this.adminService.getUsers(
      page ? parseInt(page) : 1,
      limit ? parseInt(limit) : 20,
    );
  }

  @Post('users')
  createUser(@Body() body: { email: string; password: string; name: string }) {
    return this.adminService.createUser(body);
  }

  @Patch('users/:id')
  updateUser(@Param('id') id: string, @Body() body: { email?: string; password?: string; name?: string }) {
    return this.adminService.updateUser(id, body);
  }

  @Delete('users/:id')
  deleteUser(@Param('id') id: string) {
    return this.adminService.deleteUser(id);
  }
}
